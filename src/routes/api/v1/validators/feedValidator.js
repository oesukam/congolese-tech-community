import { Joi } from 'celebrate';

const query = Joi.object().keys({
  offset: Joi.number(),
  limit: Joi.number(),
  search: Joi.string()
    .allow('')
    .optional(),
  category: Joi.string()
    .allow('')
    .optional(),
});

export default { query };
