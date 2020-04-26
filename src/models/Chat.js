import { Schema, model } from 'mongoose';

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
    default: new Date(),
  }
});

export default model('Chat', chatSchema);
