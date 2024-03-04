import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { appSchema, createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { initDataLoaders } from './loaders.js';

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
      const { prisma: db } = fastify;
      const { query, variables } = req.body;

      const depthLimitErrors = validate(appSchema, parse(query), [depthLimit(5)]);

      if (depthLimitErrors.length) {
        return { errors: depthLimitErrors };
      }

      const { data, errors } = await graphql({
        schema: appSchema,
        source: query,
        variableValues: variables,
        contextValue: {
          db,
          loaders: initDataLoaders(db),
        },
      });

      return { data, errors };
    },
  });
};

export default plugin;
