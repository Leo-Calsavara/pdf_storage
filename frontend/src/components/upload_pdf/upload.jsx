import { useEffect , useState } from "react";
import './upload.css'
import Header from '../header/header.jsx'
import { uploadPDF, createTag, getAllTags, linkPDFTag } from '../../services/pdf_api.js';
import { useNavigate } from "react-router-dom";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAllTags(localStorage.getItem("token")).then(data => {
            setTags(data.tags || data);
        });
    }, []);

    const toggleTag = (tagId) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
            ? prev.filter(id => id !== tagId)
            : [...prev, tagId]
        );
    };

    const handleCreateTag = async () => {
       if (!newTag) return;

        const created = await createTag(localStorage.getItem("token"), newTag);
        setTags(prev => [...prev, created]);
        setNewTag("");
    };

    const handleUpload = async () => {  
        if (!file) return alert("Selecione um PDF");

        const formData = new FormData();
        formData.append("pdf", file);


        const uploadResult = await uploadPDF(formData, localStorage.getItem("token"));

        const pdfId = uploadResult.pdf;

        for (const tagId of selectedTags) {
            console.log("Linking PDF ID", pdfId, "with Tag ID", tagId);
            await linkPDFTag(pdfId, tagId);
        }

        setFile(null);
        setSelectedTags([]);


        navigate("/dashboard");
    };

    return (
    <div className="upload-page">
      <Header />

      <div className="upload-card">
        <h2>Upload de PDF</h2>

        <div className="field">
          <label>Arquivo PDF</label>
          <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} />
        </div>

        <div className="field">
          <label>Tags</label>
          <div className="tags-list">
            {tags.map(tag => (
              <label key={tag.id} className="tag-item">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => toggleTag(tag.id)}
                />
                <span>{tag.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="new-tag">
          <input
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            placeholder="Nova tag"
          />
          <button onClick={handleCreateTag}>+</button>
        </div>

        <button className="upload-btn" onClick={handleUpload}>
          Enviar PDF
        </button>
      </div>
    </div>
  );
}

export default Upload;