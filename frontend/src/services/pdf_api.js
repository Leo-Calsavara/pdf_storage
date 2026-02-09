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