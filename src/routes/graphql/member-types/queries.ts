import { GraphQLList, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';
import { MemberType, memberTypesIdField } from '../types/member-types.js';
import { Context } from '../types/common.js';
import { MemberTypeId } from '../../member-types/schemas.js';
import { memberTypesDataLoader } from './loader.js';

export const MemberTypesQueries = {
  memberType: {
    type: MemberType,
    args: {
      ...memberTypesIdField,
    },
    resolve: async (
      _: unknown,
      { id }: { id: MemberTypeId },
      { db, dataloaders }: Context,
      info: GraphQLResolveInfo,
    ) => {
      let dl = dataloaders.get(info.fieldNodes);
      if (!dl) {
        dl = memberTypesDataLoader(db);
        dataloaders.set(info.fieldNodes, dl);
      }

      return await dl.load(id);
    },
  },
  memberTypes: {
    type: new GraphQLNonNull(new GraphQLList(MemberType)),
    resolve: async (_: unknown, __: unknown, { db }: Context) => {
      return await db.memberType.findMany();
    },
  },
};
