import express from 'express';
import multer from 'multer';
import { uploadRecord, getMyRecords, toggleAccess, streamDecryptedRecord} from '../controllers/recordController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
const upload = multer();

router.post('/upload-record', verifyToken, upload.single('file'), uploadRecord);
router.get('/my-records', verifyToken, getMyRecords);
router.post('/toggle-access', verifyToken, toggleAccess);
router.get('/decrypted/:cid', verifyToken, streamDecryptedRecord);

export default router;
