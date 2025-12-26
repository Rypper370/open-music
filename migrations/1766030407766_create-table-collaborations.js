exports.up = (pgm) => {
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint('collaborations', 'unique_playlist_user', {
    unique: ['playlist_id', 'user_id'],
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint('collaborations', 'unique_playlist_user');
  pgm.dropTable('collaborations');
};