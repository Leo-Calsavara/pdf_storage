import PDFRepository from "../repositories/pdf_repo.js";
import jwt from 'jsonwebtoken';

class PDFService {
    static async uploadPDF({ user, file }) {

    const exist_pdf = await PDFRepository.find_pdf(user.id, file.originalname);

        if(exist_pdf.length > 0) {
            const err = new Error('Arquivo já existe');
            err.status = 409;
            throw err;
        }

        const pdf = await PDFRepository.create(user, file);

        return {pdf};
    }
}

export default PDFService;