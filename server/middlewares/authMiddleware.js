import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

const userAuth = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // extract token from bearer token
      [, token] = req.headers.authorization.split(' ');

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    }
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, No token');
  }
});

export default userAuth;
