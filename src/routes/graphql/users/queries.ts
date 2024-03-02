import { GraphQLList, GraphQLNonNull } from 'graphql';
import { GraphQLError } from 'graphql';

import { UserType } from '../types/users.js';
import { Context, idField } from '../types/common.js';

export const UserQueries = {
  user: {
    type: new GraphQLNonNull(UserType),
    args: {
      ...idField,
    },
    resolve: async (_: unknown, { id }: { id: string }, { db }: Context) => {
      const user = await db.user.findUnique({
        where: {
          id,
        },
      });

      if (user === null) {
        return new GraphQLError('Can not find user with such id');
      }

      return user;
    },
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: async (_: unknown, __: unknown, { db }: Context) => {
      return await db.user.findMany();
    },
  },
};
