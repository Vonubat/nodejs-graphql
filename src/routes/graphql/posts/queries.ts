import { GraphQLList, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';

import { Context, idField } from '../types/common.js';
import { PostType } from '../types/posts.js';
import { postsDataLoader } from './loader.js';

export const PostQueries = {
  post: {
    type: PostType,
    args: {
      ...idField,
    },
    resolve: async (
      _: unknown,
      { id }: { id: string },
      { db, dataloaders }: Context,
      info: GraphQLResolveInfo,
    ) => {
      let dl = dataloaders.get(info.fieldNodes);
      if (!dl) {
        dl = postsDataLoader(db);
        dataloaders.set(info.fieldNodes, dl);
      }

      return await dl.load(id);
    },
  },
  posts: {
    type: new GraphQLNonNull(new GraphQLList(PostType)),
    resolve: async (_: unknown, __: unknown, { db }: Context) => {
      return await db.post.findMany();
    },
  },
};
