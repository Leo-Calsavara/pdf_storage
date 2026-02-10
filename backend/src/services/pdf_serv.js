import PDFRepository from "../repositories/pdf_repo.js";
import jwt from 'jsonwebtoken';

class PDFService {
    static async uploadPDF({ user, file }) {

    const exist_pdf = await PDFRepository.valida_pdf(user.id, file.originalname);

        if(exist_pdf.length > 0) {
            const err = new Error('Arquivo já existe');
            err.status = 409;
            throw err;
        }

        const pdf = await PDFRepository.create(user, file);

        return {pdf};
    }

    static async listPDFs(user_id) {
        const pdfs = await PDFRepository.list_pdfs(user_id);
        return pdfs;
    }

    static async linkPDFTag(pdf_id, tag_id) {
        const result = await PDFRepository.link_pdf_tag(pdf_id, tag_id);
        return result;
    }

    static async getPDFTags(pdf_id) {
        const tags = await PDFRepository.get_pdf_tags(pdf_id);
        return tags;
    }
}

export default PDFService;