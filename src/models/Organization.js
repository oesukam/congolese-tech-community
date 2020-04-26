import mongoose, { Schema } from 'mongoose';
import defaultDateTime from '../helpers/defaultDateTime';
import mongoosePaginate from 'mongoose-paginate';

const OrganizationSchema = new Schema({
  logo: {
    type: String,
  },
  image: {
    type: String,
  },
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
  category: {
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
