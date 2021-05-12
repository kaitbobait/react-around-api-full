const jwt = require('jsonwebtoken');
//create middleware for authorization
//should verify token from the headers
//If everything's fine with the token, the middleware should add the payload token to the request object and call next():
// code: req.user = payload;
//        next(); 
// if something is wrong - return 401 error

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // checks to see if there is an authorization header and starts with 'bearer'
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Authorization required' });
  }
  // getting the token as a string
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
  // trying to verify the token
  // if valid, verify() returns the decoded payload
    const payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // we return an error if something goes wrong
    return res
      .status(401)
      .send({ message: 'Authorization required' });
  }

  req.user = payload; // assigning the payload to the request object
  console.log(payload);
  console.log(req.user);

  next(); // sending the request to the next middleware

}
