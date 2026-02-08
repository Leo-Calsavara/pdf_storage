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