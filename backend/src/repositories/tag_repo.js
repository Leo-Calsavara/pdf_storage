import {db} from '../config/mariadb.js';

class TagRepository {
    static async create(tag_name, user_id) {
        const [result] = await db.query(
            'INSERT INTO tags (name, user_id) VALUES (?, ?)',
            [tag_name, user_id]
        );
        return result.insertId;
    }
    
    static async list_tags(user_id) {
        const [tags] = await db.query(
            'SELECT * FROM tags WHERE user_id = ?',
            [user_id]
        );
        return {tags};
    }
}

export default TagRepository;