const { SongValidator } = require('../../validator/music');

class SongHandler {
  constructor(service) {
    this._service = service;
  }

  async postSongHandler(request, h) {
    try {
      SongValidator.validateSongPayload(request.payload);

      const songId = await this._service.addSong(request.payload);

      return h.response({
        status: 'success',
        data: {
          songId,
        },
      }).code(201);
    } catch (error) {
      if (error.statusCode) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      }).code(500);
    }
  }

  async getSongsHandler(request, h) {
    try {
      const { title, performer } = request.query;
      const songs = await this._service.getSongs(title, performer);

      return h.response({
        status: 'success',
        data: {
          songs,
        },
      }).code(200);
    } catch (error) {
      if (error.statusCode) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      }).code(500);
    }
  }

  async getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const song = await this._service.getSongById(id);

      return h.response({
        status: 'success',
        data: {
          song,
        },
      }).code(200);
    } catch (error) {
      if (error.statusCode) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      }).code(500);
    }
  }

  async putSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      SongValidator.validateSongPayload(request.payload);

      await this._service.editSongById(id, request.payload);

      return h.response({
        status: 'success',
        message: 'Lagu berhasil diperbarui',
      }).code(200);
    } catch (error) {
      if (error.statusCode) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      }).code(500);
    }
  }

  async deleteSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteSongById(id);

      return h.response({
        status: 'success',
        message: 'Lagu berhasil dihapus',
      }).code(200);
    } catch (error) {
      if (error.statusCode) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      }).code(500);
    }
  }
}

module.exports = SongHandler;