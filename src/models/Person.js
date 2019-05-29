import mongoose, { Schema } from 'mongoose';

const personSchema = new Schema({
  providerId: {
    type: String,
    required: true,
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
    enum: ['male', 'female'],
  },
  birthDate: {
    type: Date,
  },
  nationality: {
    type: String,
  },
  bio: {
    type: String,
  },
  languages: {
    type: [String],
  },
  skills: {
    type: [String],
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  educations: [{ type: Schema.Types.ObjectId, ref: 'PersonEducation' }],
  experiences: [{ type: Schema.Types.ObjectId, ref: 'PersonExperience' }],
});

export default mongoose.model('Person', personSchema);
