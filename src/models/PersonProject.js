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
});

export default mongoose.model('PersonProject', personProjectSchema);
