import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberType, MemberTypeIdEnum } from './member-types.js';
import { Context, idField } from './common.js';
import { Static } from '@sinclair/typebox';
import { profileSchema } from '../../profiles/schemas.js';
import { UserType } from './users.js';

const profileFields = {
  isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
  yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
  userId: { type: new GraphQLNonNull(UUIDType) },
  memberTypeId: { type: new GraphQLNonNull(MemberTypeIdEnum) },
};

const profileFieldsPartial = {
  isMale: { type: GraphQLBoolean },
  yearOfBirth: { type: GraphQLInt },
  memberTypeId: { type: MemberTypeIdEnum },
};

export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    ...idField,
    ...profileFields,
    user: {
      type: UserType,
      resolve: async (
        { userId }: Static<typeof profileSchema>,
        _: unknown,
        { db }: Context,
      ) => {
        return await db.user.findUnique({ where: { id: userId } });
      },
    },
    memberType: {
      type: MemberType,
      resolve: async (
        { memberTypeId }: Static<typeof profileSchema>,
        _: unknown,
        { db }: Context,
      ) => {
        return await db.memberType.findUnique({ where: { id: memberTypeId } });
      },
    },
  }),
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    ...profileFields,
  },
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    ...profileFieldsPartial,
  },
});
