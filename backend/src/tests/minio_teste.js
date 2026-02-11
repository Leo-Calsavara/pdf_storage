import { minioClient } from "../config/minio.js";

async function testeUpload() {
    try {
            const exists = await minioClient.bucketExists('bucket-teste');
              if (!exists) {
                await minioClient.makeBucket('bucket-teste');
                console.log('Bucket criado com sucesso');
              } else {
                console.log('Bucket já existe');
              }

            await minioClient.fPutObject('bucket-teste', 'teste1/teste.pdf', '../desafio_fullstack_pdfs_avaliativo.pdf');
            console.log('Arquivo enviado com sucesso');
    } catch (error) {
        console.log('Erro no upload:', error);
    }
}

async function deleteBucket(bucketName) {
  const objects = [];

  const stream = minioClient.listObjectsV2(bucketName, '', true);
  for await (const obj of stream) {
    objects.push(obj.name);
  }

  if (objects.length > 0) {
    await minioClient.removeObjects(bucketName, objects);
    console.log('Objetos removidos');
  }

  await minioClient.removeBucket(bucketName);
  console.log('Bucket removido');
}

import fs from 'fs';
import path from 'path';

const testDownload = async () => {
    try {
        const stream = await minioClient.getObject('1-leo', 'Banner_LeonardoCalsavara.pdf');
        console.log('', stream.readable); // Verifica se o stream é legível
        
        // Define onde salvar
        const downloadPath = path.join(process.cwd(), 'downloaded-file.pdf');
        
        // Cria um stream de escrita
        const fileStream = fs.createWriteStream(downloadPath);
        
        // Pipe do MinIO direto para o arquivo
        stream.pipe(fileStream);
        
        fileStream.on('finish', () => {
            console.log('✓ Arquivo baixado com sucesso em:', downloadPath);
        });
        
        fileStream.on('error', (err) => {
            console.error('✗ Erro ao salvar arquivo:', err.message);
        });
        
    } catch (error) {
        console.error('✗ Erro:', error.message);
    }
};

testDownload();
//testeUpload();
//deleteBucket('storepdf');
