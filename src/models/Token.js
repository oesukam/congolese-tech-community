import { Schema, model } from 'mongoose';
import defaultDateTime from '../helpers/defaultDateTime';

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  token: {
    type: String,
  },
  status: {
    type: String,
    default: 'active',
  },
  signoutAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: defaultDateTime(),
  },
  notificationToken: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: defaultDateTime(),
  },
});

export default model('Token', TokenSchema);
