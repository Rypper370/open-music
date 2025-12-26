const PlaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { playlistsService, playlistSongActivitiesService, songsService, validator }) => {
    const playlistsHandler = new PlaylistsHandler(
      playlistsService, 
      playlistSongActivitiesService, 
      songsService, 
      validator
    );
    server.route(routes(playlistsHandler));
  },
};