/* eslint-disable no-async-promise-executor */
import User from '../model/userModel.js';

// find user with email
export const findUserByEmail = (email) => new Promise(async (resolve, reject) => {
  try {
    const user = User.findOne({ email });
    resolve(user);
  } catch (error) {
    reject(error);
  }
});

// get user with id
export const getUserById = (id) => new Promise(async (resolve, reject) => {
  try {
    const user = await User.findById(id);
    resolve(user);
  } catch (error) {
    reject(error);
  }
});

// get user friends from user
export const getFriends = (user) => new Promise(async (resolve, reject) => {
  try {
    const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
    resolve(friends);
  } catch (error) {
    reject(error);
  }
});
