
//create middleware for authorization
//should verify token from the headers
//If everything's fine with the token, the middleware should add the payload token to the request object and call next():
// code: req.user = payload;
//        next(); 
// if something is wrong - return 401 error