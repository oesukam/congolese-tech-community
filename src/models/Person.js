import mongoose, { Schema } from 'mongoose';

const personalSchema = {
    providerId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    middleName: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    birthDate: {
        type: Date
    },
    nationality: {
        type: String
    },
    bio: {
        type: String
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}

export default mongoose.model('Person', personalSchema);
