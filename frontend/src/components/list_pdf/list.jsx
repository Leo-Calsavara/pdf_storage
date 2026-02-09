import { useState, useEffect } from "react";
import "./list.css";
import Header from "../header/header";
import { getPDFs } from "../../services/pdf_api";

const List = () => {
  const [pdfList, setPdfList] = useState([]);

  const formatSizeMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const data = await getPDFs(localStorage.getItem("token"));
        console.log("PDFs recebidos:", data);
        setPdfList(data.pdfs);
      } catch (error) {
        alert("Erro ao buscar PDFs: " + error.message);
      }
    };

    fetchPDFs();
  }, []);

  return (
    <div className="list_container">
    <Header />
    <div>
        <h1>PDF's Armazenados</h1>
    </div>
    <div>
    <div className="pdf-table">
      <div className="pdf-row pdf-header">
        <span>Nome</span>
        <span>Tamanho</span>
        <span>Upload</span>
        <span>Download</span>
      </div>

      {pdfList.map((pdf) => (
        <div className="pdf-row" key={pdf.id}>
          <span>{pdf.pdf_name}</span>
          <span>{formatSizeMB(pdf.pdf_size)}</span>
          <span>{formatDate(pdf.uploaded_at)}</span>
          <span>ICON</span>
        </div>

      ))}
    </div>

    </div>
    </div>
  );
};

export default List;
