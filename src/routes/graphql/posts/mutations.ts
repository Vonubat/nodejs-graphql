import { GraphQLNonNull } from 'graphql';
import { Static } from '@sinclair/typebox';

import { Context, idField } from '../types/common.js';
import { CreatePostInput, PostType } from '../types/posts.js';
import { createPostSchema } from '../../posts/schemas.js';

export const PostMutations = {
  createPost: {
    type: new GraphQLNonNull(PostType),
    args: { dto: { type: CreatePostInput } },
    resolve: async (
      __: unknown,
      { dto: data }: { dto: Static<(typeof createPostSchema)['body']> },
      { db }: Context,
    ) => {
      console.log('POST_DTO:', data);
      return await db.post.create({ data });
    },
  },
  changePost: {
    type: new GraphQLNonNull(PostType),
    args: { ...idField, dto: { type: CreatePostInput } },
    resolve: async (
      __: unknown,
      { id, dto: data }: { id: string; dto: Static<(typeof createPostSchema)['body']> },
      { db }: Context,
    ) => {
      return await db.post.update({ where: { id }, data });
    },
  },
  deletePost: {
    type: new GraphQLNonNull(PostType),
    args: { ...idField },
    resolve: async (__: unknown, { id }: { id: string }, { db }: Context) => {
      return await db.post.delete({ where: { id } });
    },
  },
};