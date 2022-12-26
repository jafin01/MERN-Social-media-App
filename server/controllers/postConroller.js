import asyncHandler from 'express-async-handler';
import {
  createPost,
  findPostAndUpdate,
  getAllPosts,
  getPostById,
  getUserPosts,
} from '../helpers/postHelpers.js';
import { getUserById } from '../helpers/userHelpers.js';

// @desc create post
// @route POST /api/posts
// @access Private
export const createNewPost = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await getUserById(userId);
    await createPost(req.body, user);
    const post = await getAllPosts();
    res.status(201).json(post);
  } catch (error) {
    res.status(409);
    throw new Error(error.message);
  }
});

// @desc get all feed posts
// @route GET /api/posts
// @access Private
export const getFeedPosts = asyncHandler(async (req, res) => {
  try {
    const feedPosts = await getAllPosts();
    res.status(200).json(feedPosts);
  } catch (error) {
    throw new Error(error.message);
  }
});

// @desc find user posts
// @route GET /api/posts/:userId/posts
// @access Private
export const findUserPosts = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    const userPosts = await getUserPosts(userId);
    res.status(200).json(userPosts);
  } catch (error) {
    throw new Error(error.message);
  }
});

// @desc like post
// @route PATCH /api/posts/:id/like
// @access Private
export const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await getPostById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await findPostAndUpdate(id, post);
    res.status(200).json(updatedPost);
  } catch (error) {
    throw new Error(error.message);
  }
});
