const Spaces = require('@treehub/spaces');

module.exports = async ({LevelUpBackend, pathPrefix}) => {
  const api = new Spaces({
    prefix: pathPrefix,
    backend: LevelUpBackend,
  });
  await api.load();

  return ({route, body}) => {
    return api.request({route, body});
  };
};
