const jwt = require('jsonwebtoken');
const { KEY } = require('../config.js');
const UnauthorizedError = require('../errors/not-auth-err');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = req.cookies.jwt;
  let payload = '';
  try {
    payload = jwt.verify(token, KEY);
  } catch (e) {
    const err = new UnauthorizedError('Необходима авторизация1');
    next(err);
  }
  req.user = payload;
  return next();
};
