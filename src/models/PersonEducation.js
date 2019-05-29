import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

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
});

export default mongoose.model('PersonEducation', personEducationSchema);
