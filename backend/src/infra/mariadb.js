import mysql from 'mysql2/promise';

const db = await mysql.createPool({
  host: 'localhost',     // se Node roda fora do Docker
  user: 'fullstack_user',
  password: 'fullstack_pass',
  database: 'app_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export { db };
