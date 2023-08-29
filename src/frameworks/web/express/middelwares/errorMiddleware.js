// Imports
const response = require('@src/adapters/presenters/response');

// Express error middleware
const errorMiddleware = async (err, req, res, next) => {
  console.log(err);
  response.error(req, res, 500, 'An error occurred on server.', {});
  return next();
};

// Exports
module.exports = errorMiddleware;
