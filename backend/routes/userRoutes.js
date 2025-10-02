import express from 'express';
import { getDoctorProfiles, getUserProfile } from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/:email', verifyToken, getUserProfile); 
router.get('/', getDoctorProfiles);

export default router;
