import express from 'express';
import { getUser } from '../controllers/userController.js';
import userAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', userAuth, getUser);

export default router;
