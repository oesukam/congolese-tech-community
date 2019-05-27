import { Joi } from 'celebrate';

const signup = Joi.object().keys({
  companyName: Joi.string()
    .trim()
    .required(),
  username: Joi.string()
    .trim()
    .min(4)
    .required(),
  email: Joi.string()
    .trim()
    .email()
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
    .required(),
});

const login = Joi.object().keys({
  username: Joi.string()
    .trim()
    .min(4)
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
    .required(),
});

export default {
  signup,
  login,
};
