import { use, useState } from "react";
import './upload.css'
import Header from '../header/header.jsx'
import { uploadPDF } from '../../services/pdf_api.js';
import { useNavigate } from "react-router-dom";

const Upload = () => {
    const [file, setFile] = useState(null);

    const handle_file_change = (event) => {
        setFile(event.target.files[0]);
    }

    const handle_upload = () => {
        if (!file) {
            alert("Por favor, selecione um arquivo PDF para upload.");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", file);
        uploadPDF(formData, localStorage.getItem("token"));

        useNavigate()("/pdfs");
    }

    return (
        
        <div className="Upload">
            <Header />
            <h2>Upload de PDF</h2>
            <div>
                <input type="file" accept=".pdf" onChange={handle_file_change} />
                {file && <p>Arquivo selecionado: {file.name}</p>}
            </div>
            <button type="submit" onClick={handle_upload}>Upload</button>
        </div>
    )
}

export default Upload;