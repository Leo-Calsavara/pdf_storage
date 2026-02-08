import express from 'express';
import {router} from './src/router/routers.js';
import cors from 'cors';


const app = express();
app.use(cors({ origin: "http://localhost:5173" }))

app.use(express.json());
app.use('/api/user', router);
app.use('/api/pdf', router);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});