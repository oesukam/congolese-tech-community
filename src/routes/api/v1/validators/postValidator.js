import { Joi } from 'celebrate';

const createPost = Joi.object().keys({
  image: Joi.string().trim(),
  type: Joi.string().valid('general', 'issue'),
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
});

const updatePost = Joi.object().keys({
  image: Joi.string().trim(),
  type: Joi.string().valid('general', 'issue'),
  title: Joi.string()
    .trim()
    .min(10),
  description: Joi.string()
    .trim()
    .min(50),
  tags: Joi.array()
    .max(5)
    .items(Joi.string().trim()),
});

export default {
  createPost,
  updatePost,
};
