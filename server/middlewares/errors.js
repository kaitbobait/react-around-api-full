// 400 when something is wrong with the request.
// 401 when something goes wrong with authentication or authorization.
// 404 for example, when the requested resource with a passed _id was not found.

class requestError extends Error {
  constructor(message){
    super(message);
    this.statusCode = 400;
  }
}

class authError extends Error {
  constructor(message){
    super(message);
    this.statusCode = 401;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = { requestError, authError ,NotFoundError };