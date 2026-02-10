import { useState, useEffect } from "react";
import "./list.css";
import Header from "../header/header";
import { getPDFs, getTagsPdf } from "../../services/pdf_api";

const List = () => {
  const [pdfList, setPdfList] = useState([]);
  const [pdfTags, setPdfTags] = useState({});

  const formatSizeMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const data = await getPDFs(localStorage.getItem("token"));

        setPdfList(data.pdfs);

        const tagsMap = {};

        for (const pdf of data.pdfs) {
          const tags = await getTagsPdf(pdf.id);
          tagsMap[pdf.id] = tags.tags;
          console.log(tags.tags)
        }

        setPdfTags(tagsMap);
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
        <span className="name">Nome</span>
        <span>Tags</span>
        <span>Tamanho</span>
        <span>Upload</span>
        <span>Download</span>
      </div>

      {pdfList.map((pdf) => (
        <div className="pdf-row" key={pdf.id}>
          <span className="name">{pdf.pdf_name}</span>
          <span>{pdfTags[pdf.id]?.map(tag => tag.name).join(", ") || "—"}</span>
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
