import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  userPicturePath: {
    type: String,
    required: false,
  },
  picturePath: {
    type: String,
    required: true,
  },
  likes: {
    type: Map,
    of: Boolean,
    required: true,
  },
  comments: {
    type: Array,
    required: true,
    default: [],
  },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
