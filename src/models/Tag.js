import { Schema, model } from 'mongoose';
import defaultDateTime from '../helpers/defaultDateTime';

const TagSchema = new Schema({
  type: {
    type: String,
    default: 'post',
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  count: {
    type: Number,
    default: 1,
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

export default model('Tag', TagSchema);
