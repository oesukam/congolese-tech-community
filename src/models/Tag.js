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
});

export default model('Tag', TagSchema);
