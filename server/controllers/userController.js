import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../model/userModel.js';
import { findUserByEmail, getFriends, getUserById } from '../helpers/userHelpers.js';

// create jwt token
const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: '30d',
});

// @desc user registration
// @route POST /api/register
export const userRegistration = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const ifUser = await findUserByEmail(email);

    if (ifUser) {
      res.status(400);
      throw new Error('User Already Exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save to DB
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    throw new Error(error.message);
  }
});

// @desc user login
// @route POST /api/login
// @access Public
export const userLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // check for email
    const user = await findUserByEmail(email);

    if (!user) {
      res.status(400);
      throw new Error('user not found');
    }

    // check if user if forbidden by admin
    if (user.blockStatus) {
      res.status(403);
      throw new Error('user is blocked by admin');
    }

    // authenticate user
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({ user, token: createToken(user._id) });
    } else {
      res.status(401);
      throw new Error('Invalid login credentials');
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// @desc get the user
// @route GET /api/users/:id
// @access Private
export const getUser = asyncHandler(async (req, res) => {
  try {
    // check if id is valid
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400);
      throw new Error('Invalid objectId');
    }

    // get user by id
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    throw new Error(error.message);
  }
});

// @desc get user friends
// @route GET /api/users/:id/friends
// @access Private
export const getUserFriends = asyncHandler(async (req, res) => {
  try {
    // get the user with id
    const user = await getUserById(req.params.id);

    // get friends from user
    const friends = await getFriends(user);
    const formattedFriends = friends.map(
      ({
        _id, firstName, lastName, occupation, location, picturePath,
      }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      }),
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    throw new Error(error.message);
  }
});

// @desc add or remove friend
// @route POST /api/:id/:friendId
// @access Private
export const addOrRemoveFriend = asyncHandler(async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    // get user and friend from id
    const user = await getUserById(userId);
    const friend = await getUserById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== userId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(userId);
    }

    await user.save();
    await friend.save();

    // get updated friends list
    const updatedFriends = await getFriends(user);
    const formattedFriends = updatedFriends.map(
      ({
        _id, firstName, lastName, picturePath, occupation, location,
      }) => ({
        _id,
        firstName,
        lastName,
        picturePath,
        occupation,
        location,
      }),
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    throw new Error(error.message);
  }
});
