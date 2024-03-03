import { GraphQLList, GraphQLNonNull } from 'graphql';
import { MemberType, memberTypesIdField } from '../types/member-types.js';
import { Context } from '../types/common.js';
import { MemberTypeId } from '../../member-types/schemas.js';

export const MemberTypesQueries = {
  memberTypes: {
    type: new GraphQLNonNull(new GraphQLList(MemberType)),
    resolve: async (__: unknown, _: unknown, { db }: Context) => {
      return await db.memberType.findMany();
    },
  },
  memberType: {
    type: MemberType,
    args: {
      ...memberTypesIdField,
    },
    resolve: async (__: unknown, { id }: { id: MemberTypeId }, { db }: Context) => {
      return await db.memberType.findUnique({ where: { id } });
    },
  },
};
