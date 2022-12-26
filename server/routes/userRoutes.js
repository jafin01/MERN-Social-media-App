import express from 'express';
import { addOrRemoveFriend, getUser, getUserFriends } from '../controllers/userController.js';
import userAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', userAuth, getUser);
router.get('/:id/friends', userAuth, getUserFriends);
router.post('/:userId/:friendId', userAuth, addOrRemoveFriend);

export default router;
