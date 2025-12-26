const PlaylistSongActivitiesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistsongActivities',
  version: '1.0.0',
  register: async (server, { playlistsService, service, validator }) => {
    const playlistSongActivitiesHandler = new PlaylistSongActivitiesHandler(
      playlistsService, 
      service,
      validator
    );
    server.route(routes(playlistSongActivitiesHandler));
  },
};