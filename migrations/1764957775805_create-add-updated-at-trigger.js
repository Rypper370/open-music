exports.up = (pgm) => {
  pgm.sql(`
    CREATE OR REPLACE FUNCTION update_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER trigger_update_albums
      BEFORE UPDATE ON albums
      FOR EACH ROW EXECUTE FUNCTION update_updated_at();

    CREATE TRIGGER trigger_update_songs
      BEFORE UPDATE ON songs
      FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TRIGGER IF EXISTS trigger_update_albums ON albums;
    DROP TRIGGER IF EXISTS trigger_update_songs ON songs;
    DROP FUNCTION IF EXISTS update_updated_at();
  `);
};