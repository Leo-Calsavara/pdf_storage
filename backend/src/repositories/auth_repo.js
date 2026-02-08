import { db } from '../config/mariadb.js';
import { minioClient } from '../config/minio.js';

class UserRepository {

  static async create({ name, email, password_hash }) {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, password_hash]
    );
    
    const bucketName = `${result.insertId}-${name.toLowerCase().trim().replace(/\s+/g, '')}`;
   
    await minioClient.makeBucket(bucketName); 

    return result.insertId;

  }

  static async findByEmail(email) {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }


}

export default UserRepository;
