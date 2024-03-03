import { GraphQLList, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';

import { UserType } from '../types/users.js';
import { Context, idField } from '../types/common.js';
import { usersDataLoader } from './loader.js';

export const UserQueries = {
  user: {
    type: UserType,
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
        dl = usersDataLoader(db);
        dataloaders.set(info.fieldNodes, dl);
      }

      return await dl.load(id);
    },
  },
  users: {
    type: new GraphQLNonNull(new GraphQLList(UserType)),
    resolve: async (_: unknown, __: unknown, { db }: Context) => {
      return await db.user.findMany();
    },
  },
};
