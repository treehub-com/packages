import * as graphql from 'graphql';
import decorateSchema from '@thp/lib/decorateSchema.js';
import space from './query/space.js';
import spaces from './query/spaces.js';
import addSpace from './mutation/addSpace.js';
import updateSpace from './mutation/updateSpace.js';
import removeSpace from './mutation/removeSpace.js';
import status from './query/status.js';
import setStatus from './mutation/setStatus.js';
import setTreeStatus from './mutation/setTreeStatus.js';

const {parse, buildASTSchema} = graphql.__moduleExports;

const resolvers = {
  Query: {
    space,
    spaces,
    status,
  },
  Mutation: {
    addSpace,
    updateSpace,
    removeSpace,
    setStatus,
    setTreeStatus,
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
    # Get a space
    space(id: String!): Space
    # Get a list of spaces
    spaces: [Space!]!
    # Get the status of a space
    status(space: String!): Status
  }`,
  // Mutations
  `type Mutation {
    # Add a space
    addSpace(input: AddSpaceInput!): Space
    # Update a space
    updateSpace(input: UpdateSpaceInput!): Space
    # Remove a space
    removeSpace(input: RemoveSpaceInput!): Boolean
    # Set the sync status on a space
    setStatus(input: SetStatusInput!): Boolean
    # Set the sync status on a tree
    setTreeStatus(input: SetTreeStatusInput!): Boolean
  }`,
  // Types
  `type Space {
    # The id of the space
    id: String!
    # The fully qualified url of the remote space
    url: String!
    # The contents of the Authorization header (if any)
    authorization: String
  }`,
  `type Status {
    # The id of the space
    id: String!
    # The Last sync time
    lastSync: Int!
    # The status of each tree
    trees: [TreeStatus!]!
  }`,
  `type TreeStatus {
    # The id of the tree
    id: String!
    # The Last sync time
    lastSync: Int!
    # The last commit sync'd
    commit: String!
  }`,
  // Inputs
  `input AddSpaceInput {
    # The id of the space
    id: String!
    # The fully qualified url of the remote space
    url: String!
    # The contents of the Authorization header (if any)
    authorization: String
  }`,
  `input UpdateSpaceInput {
    # The id of the space
    id: String!
    # The fully qualified url of the remote space
    url: String!
    # The contents of the Authorization header (if any)
    authorization: String
  }`,
  `input RemoveSpaceInput {
    # The id of the space
    id: String!
  }`,
  `input SetStatusInput {
    # The id of the space
    id: String!
    # The Last sync time
    lastSync: Int!
  }`,
  `input SetTreeStatusInput {
    # The id of the space
    space: String!
    # The id of the tree
    id: String!
    # The Last sync time
    lastSync: Int!
    # The last commit sync'd
    commit: String!
  }`,
].join('\n');

const schema = buildASTSchema(parse(typeDefs));
decorateSchema(schema, resolvers);

export default schema;
