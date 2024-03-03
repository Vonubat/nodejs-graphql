import { GraphQLList, GraphQLNonNull } from 'graphql';

import { UserType } from '../types/users.js';
import { Context, idField } from '../types/common.js';

export const UserQueries = {
  user: {
    type: UserType,
    args: {
      ...idField,
    },
    resolve: async (_: unknown, { id }: { id: string }, { db }: Context) => {
      return await db.user.findUnique({ where: { id } });
    },
  },
  users: {
    type: new GraphQLNonNull(new GraphQLList(UserType)),
    resolve: async (_: unknown, __: unknown, { db }: Context) => {
      return await db.user.findMany();
    },
  },
};
