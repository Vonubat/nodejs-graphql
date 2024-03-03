import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { idField } from './common.js';

const postFields = {
  title: { type: new GraphQLNonNull(GraphQLString) },
  content: { type: new GraphQLNonNull(GraphQLString) },
  authorId: { type: new GraphQLNonNull(UUIDType) },
};

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => ({
    ...idField,
    ...postFields,
  }),
});

export const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    ...postFields,
  },
});
