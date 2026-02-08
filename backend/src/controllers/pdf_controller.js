import PDFService from "../services/pdf_serv.js";

export async function uploadPDF(req, res) {
    try{
    const pdf = await PDFService.uploadPDF(req.body);
    return res.status(201).json(pdf);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}
