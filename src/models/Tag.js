import { Schema, model } from 'mongoose';

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
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export default model('Tag', TagSchema);
