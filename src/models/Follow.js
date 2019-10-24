import { Schema, model } from 'mongoose';
import defaultDateTime from '../helpers/defaultDateTime';

const followSchema = new Schema({
  followed: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: defaultDateTime(),
  },
});

export default model('Follow', followSchema);
