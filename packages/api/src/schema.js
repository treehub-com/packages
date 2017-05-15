import * as graphqlTools from 'graphql-tools';
import spaces from './query/spaces.js';
import create from './mutation/create.js';

const resolvers = {
  Query: {
    spaces,
  },
  Mutation: {
    create,
  },
};

const typeDefs = [
  // Root
  `schema {
    query: Query
    mutation: Mutation
  }`,
  // Root Queries
  `type Query {
    spaces: [String!]!
  }`,
  // Mutations
  `type Mutation {
    create(id: String!): Boolean!
  }`,
];

export default graphqlTools.__moduleExports.makeExecutableSchema({typeDefs, resolvers});
