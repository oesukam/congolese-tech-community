import { Schema, model } from 'mongoose';
import defaultDateTime from '../helpers/defaultDateTime';

const LikeSchema = new Schema({
    post: { type: Schema.Types.ObjectId },
    user: { type: Schema.Types.ObjectId },
    createdAt: {
        type: Date,
        default: defaultDateTime(),
    }
});


export default model('Like', LikeSchema);
