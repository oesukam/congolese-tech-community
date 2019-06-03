import { Joi } from 'celebrate';

const push = Joi.object().keys({
  keys: Joi.any().required(),
  endpoint: Joi.string().required(),
});

export default {
  push,
};
