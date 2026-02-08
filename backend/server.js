import express from 'express';
import {router} from './src/router/routers.js';


const app = express();

app.use(express.json());
app.use('/api/user', router);
app.use('/api/pdf', router);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});