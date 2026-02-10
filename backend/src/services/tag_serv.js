import TagRepository from '../repositories/tag_repo.js';

class TagService {
    static async createTag(tag_name) {
        const tag = await TagRepository.create(tag_name);
        return {id: tag, name: tag_name};
    }

    static async listTags() {
        const tags = await TagRepository.list_tags();
        return tags;
    }
}

export default TagService;