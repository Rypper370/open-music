// debug-service.js di root folder
require('dotenv').config();
const { Pool } = require('pg');

async function debugDatabase() {
  console.log('🔍 DEBUG DATABASE CONNECTION');
  console.log('=============================');
  
  // Cek environment variables
  console.log('📋 Environment Variables:');
  console.log('PGUSER:', process.env.PGUSER || 'NOT SET');
  console.log('PGHOST:', process.env.PGHOST || 'NOT SET');
  console.log('PGPORT:', process.env.PGPORT || 'NOT SET');
  console.log('PGDATABASE:', process.env.PGDATABASE || 'NOT SET');
  console.log('PGPASSWORD:', process.env.PGPASSWORD ? 'SET' : 'NOT SET');
  
  // Test connection
  const pool = new Pool();
  
  try {
    console.log('\n🔗 Testing database connection...');
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected at:', result.rows[0].now);
    
    // Cek tabel
    console.log('\n📊 Checking tables...');
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    if (tables.rows.length === 0) {
      console.log('❌ No tables found! Did you run migrations?');
      console.log('💡 Run: npx node-pg-migrate up');
    } else {
      console.log('✅ Tables found:', tables.rows.map(t => t.table_name));
      
      // Cek struktur tabel albums
      const albumsColumns = await pool.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'albums'
        ORDER BY ordinal_position
      `);
      
      console.log('\n🎵 Albums table structure:');
      albumsColumns.rows.forEach(col => {
        console.log(`  - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'NO' ? 'NOT NULL' : ''}`);
      });
    }
    
  } catch (error) {
    console.error('❌ DATABASE ERROR:', error.message);
    console.error('Error code:', error.code);
    
    if (error.code === '28P01') {
      console.log('💡 Password authentication failed. Check .env file');
    } else if (error.code === '3D000') {
      console.log(`💡 Database "${process.env.PGDATABASE}" doesn't exist`);
      console.log('💡 Run: createdb ' + process.env.PGDATABASE);
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 PostgreSQL is not running');
      console.log('💡 Start it with:');
      console.log('    Windows: net start postgresql-x64-16');
      console.log('    Linux/Mac: sudo service postgresql start');
    }
  } finally {
    await pool.end();
  }
}

debugDatabase();