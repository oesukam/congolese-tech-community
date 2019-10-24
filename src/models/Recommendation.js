import { Schema, model } from 'mongoose';
import defaultDateTime from '../helpers/defaultDateTime';

const RecommendationSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: defaultDateTime(),
    },
    updatedAt: {
        type: Date,
        default: null,
    },
    accepted: {
        type: Boolean,
        default: false,
    }
});


export default model('Recommendation', RecommendationSchema);
