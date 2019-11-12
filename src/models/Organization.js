import mongoose, { Schema } from 'mongoose';

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
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
};

export default mongoose.model('Organization', OrganizationSchema);
