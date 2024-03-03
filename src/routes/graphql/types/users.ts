import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context, idField } from './common.js';
import { userSchema } from '../../users/schemas.js';
import { PostType } from './posts.js';
import { ProfileType } from './profiles.js';
import { Static } from '@sinclair/typebox';

const userFields = {
  name: { type: new GraphQLNonNull(GraphQLString) },
  balance: { type: new GraphQLNonNull(GraphQLFloat) },
};

export const UserType: GraphQLObjectType = new GraphQLObjectType<
  Static<typeof userSchema>,
  Context
>({
  name: 'UserType',
  fields: () => ({
    ...idField,
    ...userFields,
    posts: {
      type: new GraphQLNonNull(new GraphQLList(PostType)),
      resolve: async ({ id }: Static<typeof userSchema>, _: unknown, { db }: Context) => {
        return await db.post.findMany({ where: { authorId: id } });
      },
    },
    profile: {
      type: ProfileType,
      resolve: async ({ id }: Static<typeof userSchema>, _: unknown, { db }: Context) => {
        return await db.profile.findUnique({ where: { userId: id } });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: Static<typeof userSchema>, _: unknown, { db }: Context) => {
        return await db.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: Static<typeof userSchema>, _: unknown, { db }: Context) => {
        return await db.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: id,
              },
            },
          },
        });
      },
    },
  }),
});

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    ...userFields,
  },
});
