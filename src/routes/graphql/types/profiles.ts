import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberTypeIdEnum } from './member-types.js';
import { idField } from './common.js';

const profileFields = {
  isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
  yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
  userId: { type: new GraphQLNonNull(UUIDType) },
  memberTypeId: { type: new GraphQLNonNull(MemberTypeIdEnum) },
};

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: {
    ...idField,
    ...profileFields,
  },
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    ...profileFields,
  },
});
