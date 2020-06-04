const { celebrate, Joi } = require('celebrate');
const routers = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');


routers.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9!@#$%^&()]{8,30}$/),
  }),
}), login);
routers.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9!@#$%^&()]{8,30}$/),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

routers.use(auth);
routers.use('/', require('./users'));
routers.use('/', require('./articles'));

module.exports = routers;
