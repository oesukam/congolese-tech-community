import { Schema, model } from 'mongoose';
import defaultDateTime from '../helpers/defaultDateTime';

const chatSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: defaultDateTime(),
  }
});

export default model('Chat', chatSchema);
