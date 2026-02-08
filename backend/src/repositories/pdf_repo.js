import {db} from '../config/mariadb.js';
import {minioClient} from '../config/minio.js';
import fs from 'fs';

class PDFRepository {
    static async create({user_id, user_name, file_name, file_url}) { 
            const stats = await fs.stat(file_url);
            const file_size = stats.size;
        
            const [result] = await db.query(
                'INSERT INTO pdf_files (user_id, pdf_name, pdf_size) VALUES (?, ?, ?)',
                [user_id, file_name, file_size]
            );

            try {
                const bucketName = `${user_id}-${user_name.toLowerCase().trim().replace(/\s+/g, '')}`;
                await minioClient.fPutObject(bucketName, file_name, `${file_url}`);
                
            } catch (error) {
                console.log('Erro no upload:', error);
            }
        
            return result.insertId;
        }

    static async find_pdf(user_id, file_name) {
        const [exist] = await db.query(
            'SELECT * FROM pdf_files WHERE user_id = ? AND pdf_name = ?',
            [user_id, file_name]
        );
        return exist;
    
    }
}

export default PDFRepository;