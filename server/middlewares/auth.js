const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { RequestError, CastError, AuthError , ForbiddenError, NotFoundError } = require('../middlewares/errors');
//create middleware for authorization
//should verify token from the headers
//If everything's fine with the token, the middleware should add the payload token to the request object and call next():
// code: req.user = payload;
//        next();
// if something is wrong - return 401 error

console.log('auth: um hello?');

//URGENT not receiving token from header
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // checks to see if there is an authorization header and starts with 'bearer'
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .send({ message: "Authorization required - no bearer" });
  }
  // getting the token as a string
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    // trying to verify the token
    // if valid, verify() returns the decoded payload
    //NOTE jwt.verify() makes ._id into id
    console.log('before verify:', req.headers);
    payload = jwt.verify(token, JWT_SECRET);
    console.log('after verify:', req.headers);
  
  } catch (err) {
    // we return an error if something goes wrong
    throw new AuthError("Authorization required - payload not verified");
  }

  req.user = payload; // assigning the payload to the request object
  // console.log('req.user:', req.user);
  // console.log('payload:', payload);


  next(); // sending the request to the next middleware
};
