import * as graphql from 'graphql';
import Level from '@treehub/level';
import schema from './schema.js';


let db;

module.exports = async ({LevelUpBackend, pathPrefix}) => {
  db = new Level({
    name: `${pathPrefix}sync`,
    backend: LevelUpBackend,
  });
  await db.open();

  return async ({route, body}) => {
    let {query, variables, operationName} = body;

    if (typeof variables === 'string') {
      variables = JSON.parse(variables);
    }

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
  };
};
