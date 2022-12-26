import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    friends: {
      type: Array,
      required: true,
      default: [],
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    blockStatus: {
      type: Boolean,
      required: false,
      default: false,
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
      type: Number,
      required: false,
    },
    impressions: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
