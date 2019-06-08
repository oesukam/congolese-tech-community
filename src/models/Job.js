import { Schema, model } from 'mongoose';
import slugString from '../helpers/slugString';

const JobSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'JobCategory',
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  country: {
    type: String,
  },
  province: {
    type: String,
  },
  city: {
    type: String,
  },
  image: {
    type: String,
  },
  slug: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  sharesCount: {
    type: Number,
    default: 0,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    default: 'active',
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'Like', }]
});

JobSchema.pre('save', function cb(next) {
  if (!this.slug) {
    this.slug = slugString(this.title);
  }
  next();
});

export default model('Job', JobSchema);
