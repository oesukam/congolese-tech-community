import mongoose, { Schema } from 'mongoose';

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

export default mongoose.model('PersonExperience', personEducationSchema);
