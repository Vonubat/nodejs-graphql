import { GraphQLNonNull } from 'graphql';
import { Static } from '@sinclair/typebox';

import { CreateUserInput, UserType } from '../types/users.js';
import { Context, idField } from '../types/common.js';
import { createUserSchema } from '../../users/schemas.js';

export const UserMutations = {
  createUser: {
    type: new GraphQLNonNull(UserType),
    args: { data: { type: CreateUserInput } },
    resolve: async (
      __: unknown,
      { data }: { data: Static<(typeof createUserSchema)['body']> },
      { db }: Context,
    ) => {
      console.log('DATA', data);
      return await db.user.create({ data });
    },
  },
  changeUser: {
    type: new GraphQLNonNull(UserType),
    args: { ...idField, data: { type: CreateUserInput } },
    resolve: async (
      __: unknown,
      { id, data }: { id: string; data: Static<(typeof createUserSchema)['body']> },
      { db }: Context,
    ) => {
      return await db.user.update({ where: { id }, data });
    },
  },
};
