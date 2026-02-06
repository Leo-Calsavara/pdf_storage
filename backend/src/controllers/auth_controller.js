import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/mariadb.js';

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Dados obrigatórios não preenchidos' });
    }

    const [exists] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (exists.length) {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );

    return res.status(201).json({
      id: result.insertId,
      name,
      email
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Senha inválida' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret_dev',
      { expiresIn: '1d' }
    );

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
