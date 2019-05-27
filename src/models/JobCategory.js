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
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

JobCategorySchema.pre('save', function cb(next) {
  if (!this.slug) {
    this.slug = slugString(this.name);
  }
  next();
});

export default model('JobCategory', JobCategorySchema);
