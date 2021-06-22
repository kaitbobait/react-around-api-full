const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-secret' } = process.env;
const {
  AuthError
} = require('./errors');
// create middleware for authorization
// should verify token from the headers
// If everything's fine with the token, the middleware should add the payload token to the request object and call next():
// code: req.user = payload;
//        next();
// if something is wrong - return 401 error

console.log('auth: um hello?');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // checks to see if there is an authorization header and starts with 'bearer'
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Authorization required - no bearer');
  }
  // getting the token as a string
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // trying to verify the token
    // if valid, verify() returns the decoded payload
    // returns jwt signature with {_id: id of user, iat, and exp:}
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // we return an error if something goes wrong
    throw new AuthError('Authorization required - payload not verified');
  }

  req.user = payload; // assigning the payload to the request object
  // console.log('req.user:', req.user);
  // console.log('payload:', payload);

  next(); // sending the request to the next middleware
};
