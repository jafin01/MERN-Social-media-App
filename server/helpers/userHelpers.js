/* eslint-disable no-async-promise-executor */
import User from '../model/userModel.js';

// find user with email
const findUserByEmail = (email) => new Promise(async (resolve, reject) => {
  try {
    const user = User.findOne({ email });
    resolve(user);
  } catch (error) {
    reject(error);
  }
});

export default findUserByEmail;
