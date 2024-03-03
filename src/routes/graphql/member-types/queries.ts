import { GraphQLList, GraphQLNonNull } from 'graphql';
import { MemberType, memberTypesIdField } from '../types/member-types.js';
import { Context } from '../types/common.js';
import { MemberTypeId } from '../../member-types/schemas.js';

export const MemberTypesQueries = {
  memberTypes: {
    type: new GraphQLNonNull(new GraphQLList(MemberType)),
    resolve: async (_: unknown, __: unknown, { db }: Context) => {
      return await db.memberType.findMany();
    },
  },
  memberType: {
    type: MemberType,
    args: {
      ...memberTypesIdField,
    },
    resolve: async (_: unknown, { id }: { id: MemberTypeId }, { db }: Context) => {
      return await db.memberType.findUnique({ where: { id } });
    },
  },
};
