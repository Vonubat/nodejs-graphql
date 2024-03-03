import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull } from 'graphql';
import DataLoader from 'dataloader';
import { UUIDType } from './uuid.js';
import { Member } from './member-types.js';
import { User } from './users.js';
import { Profile } from './profiles.js';
import { Post } from './posts.js';

export type Context = {
  db: PrismaClient;
  dataloaders: WeakMap<
    WeakKey,
    DataLoader<string, User | Profile | Post | Member | undefined>
  >;
};

export const idField = {
  id: { type: new GraphQLNonNull(UUIDType) },
};
