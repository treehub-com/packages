import * as graphql from 'graphql';
import schema from './schema.js';
import Space from '@treehub/space';

const spaces = {};
let backend;
let prefix;

async function getSpace(id) {
  spaces[id] = new Space({
    name: id,
    prefix,
    backend,
    mode: Space.CLIENT,
  });

  return spaces[id];
}

module.exports = async ({LevelUpBackend, pathPrefix}) => {
  prefix = pathPrefix;
  backend = LevelUpBackend;

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
            prefix,
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
        space.request({
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
