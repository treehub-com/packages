import * as graphql from 'graphql';
import spaces from './query/spaces.js';
import decorateSchema from '@thp/lib/decorateSchema.js';

const {parse, buildASTSchema} = graphql.__moduleExports;

const resolvers = {
  Query: {
    spaces,
  },
};

const typeDefs = [
  // Root
  `schema {
    query: Query
  }`,
  // Root Queries
  `type Query {
    spaces: [Space!]!
  }`,
  `type Space {
    id: String!
  }`,
].join('\n');

const schema = buildASTSchema(parse(typeDefs));
decorateSchema(schema, resolvers);

export default schema;
