import { GraphQLNonNull } from 'graphql';
import { Static } from '@sinclair/typebox';

import { CreateUserInput, UserType } from '../types/users.js';
import { Context, idField } from '../types/common.js';
import { createUserSchema } from '../../users/schemas.js';

export const UserMutations = {
  createUser: {
    type: new GraphQLNonNull(UserType),
    args: { dto: { type: CreateUserInput } },
    resolve: async (
      __: unknown,
      { dto: data }: { dto: Static<(typeof createUserSchema)['body']> },
      { db }: Context,
    ) => {
      console.log('USER_DTO:', data);
      return await db.user.create({ data });
    },
  },
  changeUser: {
    type: new GraphQLNonNull(UserType),
    args: { ...idField, dto: { type: CreateUserInput } },
    resolve: async (
      __: unknown,
      { id, dto: data }: { id: string; dto: Static<(typeof createUserSchema)['body']> },
      { db }: Context,
    ) => {
      return await db.user.update({ where: { id }, data });
    },
  },
  deleteUser: {
    type: new GraphQLNonNull(UserType),
    args: { ...idField },
    resolve: async (__: unknown, { id }: { id: string }, { db }: Context) => {
      return await db.user.delete({ where: { id } });
    },
  },
};
