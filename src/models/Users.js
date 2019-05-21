import mongoose from 'mongoose';

const usersSchema = {
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        default: null
    },
    picture: {
        type: String,
        default: null,
    },
    userType: {
        type: String,
        enum: ['Personal', 'Organization'],
        required: true,
    },
    country: {
        type: String,
    },
    city: {
        type: String
    },
    website: {
        type: String
    },
    twitter: {
        type: String
    },
    facebook: {
        type: String
    },
    github: {
        type: String
    },
    linkedIn: {
        type: String
    },
    createdDate: {
        type: Date,
        default: new Date(),
    },
    updatedDate: {
        type: Date,
        default: null,
    },
    active: {
        type: Boolean,
        default: true,
    },
}

export default mongoose.model('Users', usersSchema);
