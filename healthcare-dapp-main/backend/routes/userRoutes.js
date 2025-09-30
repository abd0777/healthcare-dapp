import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/:email', verifyToken, getUserProfile); 

export default router;
