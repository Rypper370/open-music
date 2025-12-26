const AlbumHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, validator, songService }) => {
    const albumHandler = new AlbumHandler(service, validator, songService);
    server.route(routes(albumHandler));
  },
};