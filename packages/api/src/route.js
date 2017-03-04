const Spaces = require('treehub-spaces');
let api;
let initialized = false;

module.exports = async ({datapath, route, body}) => {
  if (!initialized) {
    api = new Spaces({
      prefix: datapath,
      backend: LevelUpBackend,
    });
    await api.load();
    initialized = true;
  }
  return api.request({route, body});
};
