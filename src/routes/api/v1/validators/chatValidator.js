import { Joi } from 'celebrate';

const send = Joi.object().keys({
    body: Joi.string().required().max(10000),
});

export default { send };