const URL = "http://localhost:3000/api/pdf";

export async function uploadPDF(formData, token) {
    try {
        const response = await fetch(`${URL}/upload`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })  
        return await response.json();
    } catch (error) {
        alert("Erro ao fazer upload: " + error.message);  
    }

}

export async function getPDFs(token) {
    try {
        const response = await fetch(`${URL}/list_pdfs`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        alert("Erro ao buscar PDFs: " + error.message);
    }
}

export async function getTagsPdf(pdfId) {
    try {
        const response = await fetch(`${URL}/pdf_tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pdf_id: pdfId }),
        });
        return await response.json();
    } catch (error) {
        alert("Erro ao buscar tags: " + error.message);
    }   
}


export async function createTag(name) {
    try {
        const response = await fetch(`${URL}/create_tag`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ tag_name: name })
        });
        return await response.json();
    } catch (error) {
        alert("Erro ao criar tag: " + error.message);
    }
}

export async function getAllTags() {
    try {
        const response = await fetch(`${URL}/list_tags`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    } catch (error) {
        alert("Erro ao buscar tags: " + error.message);
    }
}

export async function linkPDFTag(pdfId, tagId) {
    try {
        const response = await fetch(`${URL}/link_tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pdf_id: pdfId, tag_id: tagId })
        });
        return await response.json();
    } catch (error) {
        alert("Erro ao vincular tag: " + error.message);
    }
}