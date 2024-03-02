import { GraphQLList, GraphQLNonNull, GraphQLError } from 'graphql';

import { Context, idField } from '../types/common.js';
import { PostType } from '../types/posts.js';

export const PostQueries = {
  post: {
    type: new GraphQLNonNull(PostType),
    args: {
      ...idField,
    },
    resolve: async (_: unknown, { id }: { id: string }, { db }: Context) => {
      const post = await db.post.findUnique({
        where: {
          id,
        },
      });

      if (post === null) {
        return new GraphQLError('Can not find post with such id');
      }

      return post;
    },
  },
  posts: {
    type: new GraphQLNonNull(new GraphQLList(PostType)),
    resolve: async (_: unknown, __: unknown, { db }: Context) => {
      return await db.post.findMany();
    },
  },
};
