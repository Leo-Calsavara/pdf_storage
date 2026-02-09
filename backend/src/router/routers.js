import express from 'express';
import { register, login } from '../controllers/auth_controller.js';
import { uploadPDF, listPDFs } from '../controllers/pdf_controller.js';
import {AuthMiddleware} from '../middlewares/auth_mid.js';
import {upload} from '../middlewares/upload.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload', AuthMiddleware, upload.single('pdf'), uploadPDF);
router.get('/list_pdfs', AuthMiddleware, listPDFs); 

export {router};