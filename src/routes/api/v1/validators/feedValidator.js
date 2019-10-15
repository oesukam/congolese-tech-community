import { Joi } from 'celebrate';

const query = Joi.object().keys({
  offset: Joi.number(),
  limit: Joi.number(),
  search: Joi.string(),
  category: Joi.string(),
});

export default { query };
