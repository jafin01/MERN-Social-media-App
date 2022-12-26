/* eslint-disable no-async-promise-executor */
import Post from '../model/postModel.js';

// create new post
export const createPost = (input, user) => new Promise(async (resolve, reject) => {
  try {
    const { userId, description, picturePath } = input;
    const { firstName, lastName, location } = user;
    const newPost = new Post({
      userId,
      firstName,
      lastName,
      location,
      userPicturePath: user.picturePath,
      picturePath,
      description,
      likes: {},
      comments: [],
    });

    await newPost.save();
    resolve();
  } catch (error) {
    reject(error);
  }
});

// get all posts
export const getAllPosts = () => new Promise(async (resolve, reject) => {
  try {
    const allPosts = await Post.find();
    resolve(allPosts);
  } catch (error) {
    reject(error);
  }
});

// get user posts
export const getUserPosts = (userId) => new Promise(async (resolve, reject) => {
  try {
    const userPosts = await Post.find({ userId });
    resolve(userPosts);
  } catch (error) {
    reject(error);
  }
});

// get post by id
export const getPostById = (id) => new Promise(async (resolve, reject) => {
  try {
    const post = await Post.findById(id);
    resolve(post);
  } catch (error) {
    reject(error);
  }
});

// find post and update
export const findPostAndUpdate = (id, post) => new Promise(async (resolve, reject) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });
    resolve(updatedPost);
  } catch (error) {
    reject(error);
  }
});
