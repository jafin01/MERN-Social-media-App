import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../model/userModel.js';

// @desc user registration
// @route POST /api/register
const userRegistration = asyncHandler(async (req, res) => {
  try {
    const { password } = req.body;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save to DB
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    throw new Error(error.message);
  }
});

// @desc user login
// @route POST /api/login
// @access Public
// const userLogin = asyncHandler(async (req, res) => {
// });

export default userRegistration;
