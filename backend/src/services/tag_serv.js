import TagRepository from '../repositories/tag_repo.js';

class TagService {
    static async createTag(tag_name, user_id) {
        const tag = await TagRepository.create(tag_name, user_id);
        return {id: tag, name: tag_name};
    }

    static async listTags(user_id) {
        const tags = await TagRepository.list_tags(user_id);
        return tags;
    }
}

export default TagService;