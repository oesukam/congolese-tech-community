import { Joi } from 'celebrate';

const createExperience = Joi.object().keys({
  from: Joi.date()
    .iso()
    .required()
    .when('to', {
      is: Joi.exist(),
      then: Joi.date()
        .less(Joi.ref('to'))
        .iso(),
    }),
  to: Joi.date().iso(),
  institution: Joi.string().required(),
  description: Joi.string()
    .trim()
    .min(20),
});

const updateExperience = Joi.object().keys({
  from: Joi.date()
    .iso()
    .when('to', {
      is: Joi.exist(),
      then: Joi.date()
        .less(Joi.ref('to'))
        .iso(),
    }),
  to: Joi.date().iso(),
  institution: Joi.string(),
  description: Joi.string()
    .trim()
    .min(20),
});

export default {
  createExperience,
  updateExperience,
};
