import * as graphql from 'graphql';
import Level from '@treehub/level';
import schema from './schema.js';
import Space from '@treehub/space';

let db;
const spaces = {};
let backend;
let prefix;

async function getSpace(id) {
  if (spaces[id] !== undefined) {
    return spaces[id];
  }

  const space = await db.get(`space:${id}`);

  if (space === undefined) {
    throw new Error('Space does not exist');
  }

  spaces[id] = new Space({
    name: id,
    prefix: `${prefix}${id}.`,
    backend,
    mode: Space.CLIENT,
  });

  return spaces[id];
}

module.exports = async ({LevelUpBackend, pathPrefix}) => {
  prefix = pathPrefix;
  backend = LevelUpBackend;

  db = new Level({
    name: `${prefix}spaces`,
    backend,
  });
  await db.open();

  return async ({route, body}) => {
    const parts = route.split('/').filter((val) => val !== '');
    let {query, variables, operationName} = body;
    let space;

    if (typeof variables === 'string') {
      variables = JSON.parse(variables);
    }

    switch(parts.length) {
      case 0:
        return graphql.__moduleExports.graphql(
          schema,
          query,
          {}, // root
          {
            db,
          }, // ctx
          variables,
          operationName
        );
      case 1:
        space = await getSpace(parts[0]);
        return space.request({
          query,
          variables,
          operationName,
        });
      case 2:
        space = await getSpace(parts[0]);
        return space.request({
          tree: parts[1],
          query,
          variables,
          operationName,
        });
      default:
        throw new Error('Unknown Route');
    }
  };
};
