import mongoose from 'mongoose';

const UserSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    default: null,
  },
  picture: {
    type: String,
    default: null,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  website: {
    type: String,
  },
  twitter: {
    type: String,
  },
  facebook: {
    type: String,
  },
  github: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    default: 'active',
  },
};

export default mongoose.model('User', UserSchema);
