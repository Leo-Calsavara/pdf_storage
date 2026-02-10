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
        getAllTags().then(data => {
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

        const created = await createTag(newTag);
        setTags(prev => [...prev, created]);
        setNewTag("");
    };

    const handleUpload = async () => {  
        if (!file) return alert("Selecione um PDF");

        const formData = new FormData();
        formData.append("pdf", file);


        const uploadResult = await uploadPDF(formData, localStorage.getItem("token"));

        console.log("Selected file:", uploadResult.pdf);
        const pdfId = uploadResult.pdf;
        console.log("PDF ID:", pdfId);

        for (const tagId of selectedTags) {
            console.log("Linking PDF ID", pdfId, "with Tag ID", tagId);
            await linkPDFTag(pdfId, tagId);
        }

        setFile(null);
        setSelectedTags([]);


        navigate("/dashboard");
    };

    return (
        
        <div className="Upload">
            <Header />
            <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} />

            <h3>Tags</h3>

            <div className="tags-list">
            {tags.map(tag => (
                <label key={tag.id}>
                <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => toggleTag(tag.id)}
                />
                {tag.name}
                </label>
            ))}
            </div>

            <div className="new-tag">
            <input
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                placeholder="Nova tag"
            />
            <button onClick={handleCreateTag}>+</button>
            </div>

            <button onClick={handleUpload}>Upload</button>

        </div>
    )
}

export default Upload;