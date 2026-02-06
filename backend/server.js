import express from 'express';
import { router as authRouter } from './src/router/auth.js';

const app = express();

app.use(express.json());
app.use('/api/user', authRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});