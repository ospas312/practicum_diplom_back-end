const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const AuthEmailError = require('../errors/auth-email-err');
const { KEY } = require('../config');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  User.findOne({ email })
    .then((users) => {
      if (users) {
        throw new AuthEmailError('Email уже используется');
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name, email, password: hash,
        }))
        .then((user) => User.findOne({ _id: user._id }))
        .then((user) => res.send({ data: user }))
        .catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch(next);
};


module.exports.getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Not found user id');
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Not found user id');
      }
      res.send({ data: user });
    })
    .catch(next);
};
