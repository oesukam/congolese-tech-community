import mongoose, { Schema } from 'mongoose';
import defaultDateTime from '../helpers/defaultDateTime';

const personEducationSchema = new Schema({
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
  },
  institution: {
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
    default: defaultDateTime(),
  },
  updatedAt: {
    type: Date,
    default: defaultDateTime(),
  },
});

export default mongoose.model('PersonEducation', personEducationSchema);
