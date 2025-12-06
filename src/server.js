require('dotenv').config();
const Hapi = require('@hapi/hapi');
const MusicService = require('./service/postgres/MusicService');
const albums = require('./api/albums');
const songs = require('./api/songs');

const init = async () => {
  const musicService = new MusicService();

  const server = Hapi.server({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: musicService,
      },
    },
    {
      plugin: songs,
      options: {
        service: musicService,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

init().catch((err) => {
  console.log(err);
  process.exit(1);
});