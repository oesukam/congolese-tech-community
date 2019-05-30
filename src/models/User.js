import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const UserSchema = new Schema({
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
  province: {
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
  status: {
    type: String,
    default: 'active',
  },
  userType: {
    type: String,
    default: 'user',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  info: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.plugin(mongoosePaginate);

export default mongoose.model('User', UserSchema);
