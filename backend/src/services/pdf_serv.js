import PDFRepository from "../repositories/pdf_repo.js";
import jwt from 'jsonwebtoken';

class PDFService {
    static async uploadPDF({token, file_name, file_url}){
        const decoded = jwt.decode(token);

        const exist_pdf = await PDFRepository.find_pdf(decoded.id, file_name);
        if(exist_pdf.length > 0) {
            const err = new Error('Arquivo já existe');
            err.status = 409;
            throw err;
        }

        const pdf = await PDFRepository.create(decoded.id, decoded.name, file_name, file_url);

        return {pdf};
    }
}

export default PDFService;