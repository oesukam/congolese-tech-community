import { Joi } from 'celebrate';

const createJobCategory = Joi.object().keys({
  image: Joi.string(),
  name: Joi.string().required(),
  description: Joi.string().trim(),
});

const updateJobCategory = Joi.object().keys({
  image: Joi.string(),
  name: Joi.string()
    .trim()
    .min(10),
  description: Joi.string().trim(),
});

export default {
  createJobCategory,
  updateJobCategory,
};
