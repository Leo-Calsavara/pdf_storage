import { db } from '../infra/mariadb.js';


async function seed() {
  try {
    console.log('Iniciando seed...');

    // 1. Usuário
    const [userResult] = await db.execute(
      `INSERT INTO users (name, email, password_hash)
       VALUES (?, ?, ?)`,
      ['Leonardo Calsavara', 'leo@email.com', 'hash_fake_123']
    );
    const userId = userResult.insertId;
    console.log('✔ Usuário criado com ID:', userId);

    // 2. PDF
    const [pdfResult] = await db.execute(
      `INSERT INTO pdf_files (user_id, original_name, minio_path, size)
       VALUES (?, ?, ?, ?)`,
      [userId, 'contrato.pdf', `user-${userId}/contrato.pdf`, 245678]
    );
    const pdfId = pdfResult.insertId;
    console.log('✔ PDF criado com ID:', pdfId);

    // 3. Tags
    const tags = ['financeiro', 'pessoal', '2026'];
    const tagIds = [];

    for (const tag of tags) {
      const [tagResult] = await db.execute(
        `INSERT INTO tags (name) VALUES (?)`,
        [tag]
      );
      tagIds.push(tagResult.insertId);
    }
    console.log('✔ Tags criadas:', tagIds);

    // 4. Relacionar PDF ↔ Tags
    for (const tagId of tagIds) {
      await db.execute(
        `INSERT INTO pdf_tags (pdf_id, tag_id) VALUES (?, ?)`,
        [pdfId, tagId]
      );
    }
    console.log('✔ PDF relacionado com tags');

    console.log('🎉 Seed finalizado com sucesso!');
    process.exit(0);

  } catch (err) {
    console.error('❌ Erro no seed:', err);
    process.exit(1);
  }
}

seed();
