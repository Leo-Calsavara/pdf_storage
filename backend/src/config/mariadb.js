/*import mysql from 'mysql2/promise';

const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export { db };*/

import mysql from 'mysql2/promise'; 

const db = await mysql.createPool({ 
  host: 'localhost', 
  user: 'fullstack_user', 
  password: 'fullstack_pass', 
  database: 'app_db', 
  waitForConnections: true, 
  connectionLimit: 10, 
  queueLimit: 0,
 }); 
 
 export { db };
