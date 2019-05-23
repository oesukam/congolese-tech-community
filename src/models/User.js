import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  authType: {
    type: String,
  },
  userType: {
    type: String,
    required: true,
    default: 'user',
  },
  image: {
    type: String,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  linkedInLink: {
    type: String,
  },
  githubLink: {
    type: String,
  },
  facebookLink: {
    type: String,
  },
  twitterLink: {
    type: String,
  },
  websiteLink: {
    type: String,
  },
});

export default model('User', UserSchema);
