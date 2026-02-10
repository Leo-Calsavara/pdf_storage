import {db} from '../config/mariadb.js';
import {minioClient} from '../config/minio.js';

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

    static async link_pdf_tag(pdf_id, tag_id) {
        const [pdfs] = await db.query(
            'INSERT into pdf_tags (pdf_id, tag_id) VALUES (?, ?)',
            [pdf_id, tag_id]
        );

        return {message: 'Tags associadas ao PDF com sucesso!'};
    }

    static async get_pdf_tags(pdf_id) {
        const [tags] = await db.query(
            `SELECT t.id, t.name 
             FROM tags t
             JOIN pdf_tags pt ON t.id = pt.tag_id
             WHERE pt.pdf_id = ?`,
            [pdf_id]
        );
        return {tags};
    }
}

export default PDFRepository;