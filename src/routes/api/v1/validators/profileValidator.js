import { Joi } from 'celebrate';

const updateUser = Joi.object().keys({
  username: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  picture: Joi.string(),
  country: Joi.string(),
  province: Joi.string(),
  city: Joi.string(),
  website: Joi.string(),
  twitter: Joi.string(),
  facebook: Joi.string(),
  github: Joi.string(),
  linkedIn: Joi.string(),
});

const updateProfile = Joi.object().keys({
  firstName: Joi.string(),
  middleName: Joi.string(),
  lastName: Joi.string(),
  gender: Joi.string().valid('male', 'female'),
  nationality: Joi.string(),
  languages: Joi.array().items(Joi.string()),
  skills: Joi.array().items(Joi.string()),
  bio: Joi.string()
    .trim()
    .min(20),
  profession: Joi.string().max(50).min(2), 
});

export default {
  updateProfile,
  updateUser,
};
