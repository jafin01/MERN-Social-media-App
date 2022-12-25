import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picturePath: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  occupation: {
    type: String,
    required: false,
  },
  viewedProfile: {
    type: String,
    required: false,
  },
  impressions: {
    type: String,
    required: false,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
