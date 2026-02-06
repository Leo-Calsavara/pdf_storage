import express from 'express';
import { router as authRouter } from './src/router/auth.js';
import { db } from './src/config/mariadb.js';

(async () => {
  try {
    await db.query('SELECT 1');
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
  }
})();

const app = express();
app.use('/api/user', authRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});