import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const OrganizationSchema = new Schema({
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
  status: {
    type: String,
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

OrganizationSchema.plugin(mongoosePaginate);

export default mongoose.model('Organization', OrganizationSchema);
