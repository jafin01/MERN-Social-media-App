import express from 'express';
import upload from '../middlewares/multerMiddleware.js';
import userAuth from '../middlewares/authMiddleware.js';
import { userLogin, userRegistration } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', upload.single('picture'), userRegistration);

router.post('/login', userAuth, userLogin);

export default router;
