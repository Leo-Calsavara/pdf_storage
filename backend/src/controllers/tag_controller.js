import TagService from '../services/tag_serv.js';


export async function createTag(req, res) {
    try {
        const user_id = req.user.id;
        const { tag_name } = req.body;
        const tag = await TagService.createTag(tag_name, user_id);
        return res.status(201).json(tag);
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message });
    }
}

export async function listTags(req, res) {
    try {
        const tags = await TagService.listTags(req.user.id);
        return res.status(200).json(tags);
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message });
    }
}