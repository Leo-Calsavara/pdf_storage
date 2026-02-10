import PDFService from "../services/pdf_serv.js";

export async function uploadPDF(req, res) {
    try{
        const file = req.file;
        const user = req.user;

        const pdf = await PDFService.uploadPDF({ user, file });
        return res.status(201).json(pdf);

  } catch (err) {
        return res.status(err.status || 500).json({ error: err.message });
  }
}

export async function listPDFs(req, res) {
    try {
        const user = req.user;
        const pdfs = await PDFService.listPDFs(user.id);
        return res.status(200).json(pdfs);
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message });
    }
}

export async function linkPDFTag(req, res) {
    try {
        const { pdf_id, tag_id } = req.body;
        const result = await PDFService.linkPDFTag(pdf_id, tag_id);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message });
    }
}

export async function getPDFTags(req, res) {
    try {
        const { pdf_id } = req.body;
        const tags = await PDFService.getPDFTags(pdf_id);
        return res.status(200).json(tags);
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message });
    }
}