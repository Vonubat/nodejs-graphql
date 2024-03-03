import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { idField } from './common.js';

const userFields = {
  name: { type: new GraphQLNonNull(GraphQLString) },
  balance: { type: new GraphQLNonNull(GraphQLFloat) },
};

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'UserType',
  fields: {
    ...idField,
    ...userFields,
  },
});

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    ...userFields,
  },
});
