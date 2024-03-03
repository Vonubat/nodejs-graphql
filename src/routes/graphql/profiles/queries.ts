import { GraphQLList, GraphQLNonNull, GraphQLError } from 'graphql';

import { Context, idField } from '../types/common.js';
import { ProfileType } from '../types/profiles.js';

export const ProfileQueries = {
  profile: {
    type: new GraphQLNonNull(ProfileType),
    args: {
      ...idField,
    },
    resolve: async (_: unknown, { id }: { id: string }, { db }: Context) => {
      const profile = await db.profile.findUnique({
        where: {
          id,
        },
      });

      if (profile === null) {
        return new GraphQLError('Can not find profile with such id');
      }

      return profile;
    },
  },
  profiles: {
    type: new GraphQLNonNull(new GraphQLList(ProfileType)),
    resolve: async (_: unknown, __: unknown, { db }: Context) => {
      return await db.profile.findMany();
    },
  },
};
