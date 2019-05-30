import mongoose, { Schema } from 'mongoose';

const personProjectSchema = new Schema({
  openSource: {
    type: Boolean,
    default: false,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
  },
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('PersonProject', personProjectSchema);
