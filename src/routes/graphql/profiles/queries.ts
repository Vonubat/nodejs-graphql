import { GraphQLList, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';

import { Context, idField } from '../types/common.js';
import { ProfileType } from '../types/profiles.js';
import { profilesDataLoader } from './loader.js';

export const ProfileQueries = {
  profile: {
    type: ProfileType,
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
        dl = profilesDataLoader(db);
        dataloaders.set(info.fieldNodes, dl);
      }

      return await dl.load(id);
    },
  },
  profiles: {
    type: new GraphQLNonNull(new GraphQLList(ProfileType)),
    resolve: async (_: unknown, __: unknown, { db }: Context) => {
      return await db.profile.findMany();
    },
  },
};
