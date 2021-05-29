const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const {
  RequestError,
  CastError,
  AuthError,
  ForbiddenError,
  NotFoundError,
} = require('../middlewares/errors');

console.log('auth: um hello?');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Authorization required - no bearer');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  // FIXME replace JWT_SECRET with 'dev-secret' or do an env check for dev or production with NODE_ENV
  // when you generate the token, it is generated with 'dev-secret' bc in localhost the env is development, 
  // but here you hard-coded JWT_SECRET instead of checking for the environment
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError('Authorization required - payload not verified');
  }

  req.user = payload;

  next();
};
