import express from 'express';
import {
  createNewPost,
  findUserPosts,
  getFeedPosts,
  likePost,
} from '../controllers/postConroller.js';
import userAuth from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.post('/', userAuth, upload.single('picture'), createNewPost);
router.get('/', userAuth, getFeedPosts);
router.get('/:userId/posts', userAuth, findUserPosts);
router.patch('/:id/like', userAuth, likePost);

export default router;
