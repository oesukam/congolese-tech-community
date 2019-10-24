import mongoose, { Schema } from 'mongoose';
import defaultDateTime from '../helpers/defaultDateTime';

const OrganizationSchema = {
  name: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
  },
  employeesNumber: {
    type: Number,
  },
  description: {
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
};

export default mongoose.model('Organization', OrganizationSchema);
