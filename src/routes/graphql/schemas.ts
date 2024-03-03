import { Type } from '@fastify/type-provider-typebox';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { UserQueries } from './users/queries.js';
import { UserMutations } from './users/mutations.js';
import { PostQueries } from './posts/queries.js';
import { PostMutations } from './posts/mutations.js';
import { MemberTypesQueries } from './member-types/queries.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const appSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      ...UserQueries,
      ...PostQueries,
      ...MemberTypesQueries,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...UserMutations,
      ...PostMutations,
    },
  }),
});
