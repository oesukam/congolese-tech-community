import { Schema, model } from 'mongoose';
import slugString from '../helpers/slugString';

const PostSchema = new Schema({
  slug: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    default: 'general',
  },
  userType: {
    type: String,
    default: 'general',
  },
  image: {
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
  commentsCount: {
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
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
  country: {
    type: String,
  },
  province: {
    type: String,
  },
  city: {
    type: String,
  },
});

PostSchema.pre('save', function cb(next) {
  if (!this.slug) {
    this.slug = slugString(this.title || this.description);
  }
  next();
});

export default model('Post', PostSchema);
