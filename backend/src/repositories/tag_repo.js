import {db} from '../config/mariadb.js';

class TagRepository {
    static async create(tag_name) {
        const [result] = await db.query(
            'INSERT INTO tags (name) VALUES (?)',
            [tag_name]
        );
        return result.insertId;
    }
    
    static async list_tags() {
        const [tags] = await db.query(
            'SELECT * FROM tags'
        );
        return {tags};
    }
}

export default TagRepository;