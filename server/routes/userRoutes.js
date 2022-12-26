import express from 'express';
import { getUser, getUserFriends } from '../controllers/userController.js';
import userAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', userAuth, getUser);
router.get('/:id/friends', userAuth, getUserFriends);

export default router;
