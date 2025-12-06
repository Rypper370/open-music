const { AlbumValidator } = require('../../validator/music');

class AlbumHandler {
  constructor(service) {
    this._service = service;
  }

  async postAlbumHandler(request, h) {
    try {
      AlbumValidator.validateAlbumPayload(request.payload);

      const albumId = await this._service.addAlbum(request.payload);

      return h.response({
        status: 'success',
        data: {
          albumId,
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

  async getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const album = await this._service.getAlbumById(id);
      const songs = await this._service.getSongsByAlbumId(id);

      return h.response({
        status: 'success',
        data: {
          album: {
            ...album,
            songs,
          },
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

  async putAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      AlbumValidator.validateAlbumPayload(request.payload);

      await this._service.editAlbumById(id, request.payload);

      return h.response({
        status: 'success',
        message: 'Album berhasil diperbarui',
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

  async deleteAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteAlbumById(id);

      return h.response({
        status: 'success',
        message: 'Album berhasil dihapus',
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

module.exports = AlbumHandler;