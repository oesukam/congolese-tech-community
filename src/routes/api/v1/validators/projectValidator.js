import { Joi } from 'celebrate';

const createProject = Joi.object().keys({
  openSource: Joi.boolean(),
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
  owner: Joi.string().required(),
  description: Joi.string()
    .trim()
    .min(20),
});

const updateProject = Joi.object().keys({
  openSource: Joi.boolean(),
  from: Joi.date()
    .iso()
    .when('to', {
      is: Joi.exist(),
      then: Joi.date()
        .less(Joi.ref('to'))
        .iso(),
    }),
  to: Joi.date().iso(),
  owner: Joi.string(),
  description: Joi.string()
    .trim()
    .min(20),
});

export default {
  createProject,
  updateProject,
};
