// 400 when something is wrong with the request, invalid data passed
// 401 when something goes wrong with authentication or authorization.
// 404 for example, when the requested resource with a passed _id was not found.
// 500 default error; should return the message: an error has occurred on the server

class RequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class CastError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  RequestError, CastError, AuthError, ForbiddenError, NotFoundError, ConflictError,
};
