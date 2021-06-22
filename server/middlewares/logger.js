const winston = require('winston');
const expressWinston = require('express-winston');

// create a request logger
const requestLogger = expressWinston.logger({
  // where the logs are written
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  // format of the logging
  format: winston.format.json(),
});

// error logger
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
