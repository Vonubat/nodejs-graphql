import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull } from 'graphql';
import { UUIDType } from './uuid.js';

export type Context = {
  db: PrismaClient;
};

export const idField = {
  id: { type: new GraphQLNonNull(UUIDType) },
};
