import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/auth_repo.js';

class AuthService {
  static async register({ name, email, password }) {
    if (!name || !email || !password) {
      const err = new Error('Dados obrigatórios não preenchidos');
      err.status = 400;
      throw err;
    }

    const existing_user = await UserRepository.findByEmail(email);
    if (existing_user) {
      const err = new Error('Email já cadastrado');
      err.status = 409;
      throw err;
    }

    const password_hash = await bcrypt.hash(password, 10);

    const id = await UserRepository.create({
      name,
      email,
      password_hash
    });

    return { id, name, email };
  }

  static async login({ email, password }) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      const err = new Error('Usuário não encontrado');
      err.status = 401;
      throw err;
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      const err = new Error('Senha inválida');
      err.status = 401;
      throw err;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'secret_dev',
      { expiresIn: '1d' }
    );

    return { token };
  }
}

export default AuthService;
