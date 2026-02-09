import {db} from '../config/mariadb.js';
import {minioClient} from '../config/minio.js';
import fs from 'fs';

class PDFRepository {
    static async create(user, file) { 
            const bucketName = `${user.id}-${user.name.toLowerCase().trim().replace(/\s+/g, '')}`;

            const [result] = await db.query(
            'INSERT INTO pdf_files (user_id, pdf_name, pdf_size) VALUES (?, ?, ?)',
            [user.id, file.originalname, file.size]
            );

            console.log('nome bucket', bucketName);
            await minioClient.fPutObject(bucketName, file.originalname, file.path);
        
            return result.insertId;
        }

    static async valida_pdf(user_id, file_name) {
        const [exist] = await db.query(
            'SELECT * FROM pdf_files WHERE user_id = ? AND pdf_name = ?',
            [user_id, file_name]
        );
        return exist;
    
    }

    static async list_pdfs(user_id) {
        const [pdfs] = await db.query(
            'SELECT * FROM pdf_files WHERE user_id = ?',
            [user_id]
        );
        return {pdfs};
    }
}

export default PDFRepository;