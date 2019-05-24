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
};

export default mongoose.model('Organization', OrganizationSchema);
