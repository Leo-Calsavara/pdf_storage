import { minioClient } from "../config/minio.js";
import fs from 'fs';

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


//testeUpload();
//deleteBucket('storepdf');
