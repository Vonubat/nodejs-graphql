import { GraphQLNonNull } from 'graphql';

import { Context, idField } from '../types/common.js';
import { CreateProfileInput, ProfileType } from '../types/profiles.js';
import { createProfileSchema } from '../../profiles/schemas.js';
import { Static } from '@sinclair/typebox';

export const ProfileMutations = {
  createProfile: {
    type: new GraphQLNonNull(ProfileType),
    args: { dto: { type: CreateProfileInput } },
    resolve: async (
      __: unknown,
      { dto: data }: { dto: Static<(typeof createProfileSchema)['body']> },
      { db }: Context,
    ) => {
      console.log('PROFILE_DTO:', data);
      return await db.profile.create({ data });
    },
  },
  changeProfile: {
    type: new GraphQLNonNull(ProfileType),
    args: { ...idField, dto: { type: CreateProfileInput } },
    resolve: async (
      __: unknown,
      {
        id,
        dto: data,
      }: { id: string; dto: Static<(typeof createProfileSchema)['body']> },
      { db }: Context,
    ) => {
      return await db.profile.update({ where: { id }, data });
    },
  },
  deleteProfile: {
    type: new GraphQLNonNull(ProfileType),
    args: { ...idField },
    resolve: async (__: unknown, { id }: { id: string }, { db }: Context) => {
      return await db.profile.delete({ where: { id } });
    },
  },
};
