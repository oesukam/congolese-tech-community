import { Schema, model } from 'mongoose';
import slugString from '../helpers/slugString';
import defaultDateTime from '../helpers/defaultDateTime';

const JobCategorySchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: defaultDateTime(),
  },
  updatedAt: {
    type: Date,
    default: defaultDateTime(),
  },
});

JobCategorySchema.pre('save', function cb(next) {
  if (!this.slug) {
    this.slug = slugString(this.name);
  }
  next();
});

export default model('JobCategory', JobCategorySchema);
