import AuthService from '../services/auth_serv.js';

export async function register(req, res) {
  try {
    const user = await AuthService.register(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const token = await AuthService.login(req.body);
    return res.json(token);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}
