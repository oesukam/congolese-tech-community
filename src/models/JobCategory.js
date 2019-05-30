import { Schema, model } from 'mongoose';
import slugString from '../helpers/slugString';

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
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

JobCategorySchema.pre('save', function cb(next) {
  if (!this.slug) {
    this.slug = slugString(this.name);
  }
  next();
});

export default model('JobCategory', JobCategorySchema);
