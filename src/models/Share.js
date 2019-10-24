import { Schema, model } from 'mongoose';
import defaultDateTime from '../helpers/defaultDateTime';

const ShareSchema = new Schema({
  plateforme: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
  },
  createdAt: {
    type: Date,
    default: defaultDateTime(),
  },
  updatedAt: {
    type: Date,
    default: defaultDateTime(),
  },
});

export default model('Share', ShareSchema);
