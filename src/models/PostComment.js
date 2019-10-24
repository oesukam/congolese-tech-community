import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import defaultDateTime from '../helpers/defaultDateTime';

const postCommentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'active',
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

postCommentSchema.plugin(mongoosePaginate);

export default model('PostComment', postCommentSchema);
