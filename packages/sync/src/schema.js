import * as graphql from 'graphql';
import space from './query/space.js';
import spaces from './query/spaces.js';
import decorateSchema from '@thp/lib/decorateSchema.js';

const {parse, buildASTSchema} = graphql.__moduleExports;

const resolvers = {
  Query: {
    space,
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
    # Get a space
    space(id: String!): Space
    # Get a list of spaces
    spaces: [Space!]!
  }`,
  `type Space {
    # The id of the space
    id: String!
    # The fully qualified url of the remote space
    url: String!
    # The contents of the Authorization header (if any)
    authorization: String
  }`,
].join('\n');

const schema = buildASTSchema(parse(typeDefs));
decorateSchema(schema, resolvers);

export default schema;
