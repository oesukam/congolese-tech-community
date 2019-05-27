import { Joi } from 'celebrate';

const createJob = Joi.object().keys({
  category: Joi.string().required(),
  type: Joi.string(),
  image: Joi.string(),
  title: Joi.string()
    .trim()
    .min(10)
    .required(),
  description: Joi.string()
    .trim()
    .min(50)
    .required(),
  tags: Joi.array()
    .max(5)
    .items(Joi.string().trim()),
  country: Joi.string(),
  province: Joi.string(),
  city: Joi.string(),
});

const updateJob = Joi.object().keys({
  category: Joi.string(),
  type: Joi.string(),
  image: Joi.string(),
  title: Joi.string()
    .trim()
    .min(10),
  description: Joi.string()
    .trim()
    .min(50),
  tags: Joi.array()
    .max(5)
    .items(Joi.string().trim()),
  country: Joi.string(),
  province: Joi.string(),
  city: Joi.string(),
});

export default {
  createJob,
  updateJob,
};
