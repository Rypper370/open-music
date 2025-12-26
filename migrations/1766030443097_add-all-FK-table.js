exports.up = (pgm) => {
  pgm.addConstraint('songs', 'fk_songs_album_id', {
    foreignKeys: {
      columns: 'album_id',
      references: 'albums(id)',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  });

  pgm.addConstraint('playlists', 'fk_playlists_owner', {
    foreignKeys: {
      columns: 'owner',
      references: 'users(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  });

  pgm.addConstraint('playlist_songs', 'fk_playlist_songs_playlist_id', {
    foreignKeys: {
      columns: 'playlist_id',
      references: 'playlists(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  });
  pgm.addConstraint('playlist_songs', 'fk_playlist_songs_song_id', {
    foreignKeys: {
      columns: 'song_id',
      references: 'songs(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  });

  pgm.addConstraint('collaborations', 'fk_collaborations_playlist_id', {
    foreignKeys: {
      columns: 'playlist_id',
      references: 'playlists(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  });
  pgm.addConstraint('collaborations', 'fk_collaborations_user_id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  });

  pgm.addConstraint('playlist_song_activities', 'fk_activities_playlist_id', {
    foreignKeys: {
      columns: 'playlist_id',
      references: 'playlists(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  });
  pgm.addConstraint('playlist_song_activities', 'fk_activities_song_id', {
    foreignKeys: {
      columns: 'song_id',
      references: 'songs(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  });
  pgm.addConstraint('playlist_song_activities', 'fk_activities_user_id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint('playlist_song_activities', 'fk_activities_user_id');
  pgm.dropConstraint('playlist_song_activities', 'fk_activities_song_id');
  pgm.dropConstraint('playlist_song_activities', 'fk_activities_playlist_id');

  pgm.dropConstraint('collaborations', 'fk_collaborations_user_id');
  pgm.dropConstraint('collaborations', 'fk_collaborations_playlist_id');

  pgm.dropConstraint('playlist_songs', 'fk_playlist_songs_song_id');
  pgm.dropConstraint('playlist_songs', 'fk_playlist_songs_playlist_id');

  pgm.dropConstraint('playlists', 'fk_playlists_owner');

  pgm.dropConstraint('songs', 'fk_songs_album_id');
};