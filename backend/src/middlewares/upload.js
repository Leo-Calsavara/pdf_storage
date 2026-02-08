import multer from 'multer';

const upload = multer({ dest: 'tmp_uploads/' });

export { upload };
