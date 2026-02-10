import TagService from '../services/tag_serv.js';


export async function createTag(req, res) {
    try {
        const { tag_name } = req.body;
        const tag = await TagService.createTag(tag_name);
        return res.status(201).json(tag, tag_name);
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message });
    }
}

export async function listTags(req, res) {
    try {
        const tags = await TagService.listTags();
        return res.status(200).json(tags);
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message });
    }
}