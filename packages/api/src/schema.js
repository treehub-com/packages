import * as graphqlTools from 'graphql-tools';
import space from './query/space.js';
import spaces from './query/spaces.js';
import createSpace from './mutation/createSpace.js';

const resolvers = {
  Query: {
    space,
    spaces,
  },
  Mutation: {
    createSpace,
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
    space(id: String!): Space
    spaces: [Space!]!
  }`,
  // Mutations
  `type Mutation {
    createSpace(input: CreateSpaceInput!): CreateSpaceOutput!
  }`,
  // Types
  `type Error {
    # The input field of the error, if any
    key: String
    # The error message, suitable for display
    message: String!
  }`,
  `type Space {
    id: String!
  }`,
  // Inputs
  `input CreateSpaceInput {
    id: String!
  }`,
  `type CreateSpaceOutput {
    errors: [Error!]!
    space: Space
  }`,
];

export default graphqlTools.__moduleExports.makeExecutableSchema({typeDefs, resolvers});
