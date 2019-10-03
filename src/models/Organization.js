import mongoose, { Schema } from 'mongoose';

const OrganizationSchema = {
  name: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
  },
  description: {
    type: String,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  employees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  employeesNumber: {
    type: Number,
  },
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
