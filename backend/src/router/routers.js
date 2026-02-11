import express from 'express';
import { register, login } from '../controllers/auth_controller.js';
import { uploadPDF, listPDFs, linkPDFTag, getPDFTags, downloadPDF } from '../controllers/pdf_controller.js';
import {AuthMiddleware} from '../middlewares/auth_mid.js';
import {upload} from '../middlewares/upload.js';
import {listTags, createTag} from '../controllers/tag_controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload', AuthMiddleware, upload.single('pdf'), uploadPDF);
router.post('/create_tag', AuthMiddleware, createTag);
router.post('/pdf_tags', getPDFTags);
router.post('/link_tags', linkPDFTag);
router.get('/list_tags', AuthMiddleware, listTags);
router.get('/list_pdfs', AuthMiddleware, listPDFs); 
router.get('/download', AuthMiddleware, downloadPDF);

export {router};