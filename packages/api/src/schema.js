import * as graphql from 'graphql';
import space from './query/space.js';
import spaces from './query/spaces.js';
import createSpace from './mutation/createSpace.js';

const {parse, buildASTSchema} = graphql.__moduleExports;

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
].join('\n');

const schema = buildASTSchema(parse(typeDefs));

// Adapted from graphql-tools makeExecutableSchema
// For each resolver
for (const typeName of Object.keys(resolvers)) {
  // Get the type from the schema
  const type = schema.getType(typeName);
  // Ensure we have a type for the resolver in the schema
  if (!type && typeName !== '__schema') {
    throw new Error(`"${typeName}" defined in resolvers, but not in schema`);
  }
  // For each field in the resolver
  for (const fieldName of Object.keys(resolvers[typeName])) {
    // Add __ resolver fields to the type instead of the field (i.e. scalars)
    if (fieldName.startsWith('__')) {
      type[fieldName.substring(2)] = resolvers[typeName][fieldName];
      continue;
    }
    // Get all of the fields for this type
    const fields = type.getFields();
    // Ensure we have the field in the schema
    if (!fields[fieldName]) {
      throw new Error(`${typeName}.${fieldName} defined in resolvers, but not in schema`); // eslint-disable-line max-len
    }
    // Get the field and the resolver for the field
    const field = fields[fieldName];
    const fieldResolve = resolvers[typeName][fieldName];
    // If the resolver is a function, add it as the resovler
    if (typeof fieldResolve === 'function') {
      field.resolve = fieldResolve;
    } else {
    // Otherwise, the resolver is a type definition
      for (const propertyName of Object.keys(fieldResolve)) {
        field[propertyName] = fieldResolve[propertyName];
      }
    }
  }
}

export default schema;
