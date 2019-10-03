import { Joi } from 'celebrate';

const create = Joi.object().keys({
  name: Joi.string()
    .trim()
    .required(),
  picture: Joi.string().trim(),
  registrationNumber: Joi.string()
    .trim()
    .min(4)
    .required(),
  email: Joi.string()
    .trim()
    .email()
    .required(),
  country: Joi.string()
    .trim()
    .required(),
  province: Joi.string().trim(),
  city: Joi.string().trim(),
  address: Joi.string().trim(),
  website: Joi.string().trim(),
  twitter: Joi.string().trim(),
  facebook: Joi.string().trim(),
  github: Joi.string().trim(),
  linkedIn: Joi.string().trim(),
  description: Joi.string()
    .trim()
    .required(),
});

export default {
  create,
};
