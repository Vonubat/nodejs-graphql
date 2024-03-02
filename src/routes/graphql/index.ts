import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { appSchema, createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { prisma } = fastify;
      const { query, variables } = req.body;
      console.log('BODY', req.body);
      const { data, errors } = await graphql({
        schema: appSchema,
        source: query,
        variableValues: variables,
        contextValue: {
          db: prisma,
        },
      });

      return { data, errors };
    },
  });
};

export default plugin;
