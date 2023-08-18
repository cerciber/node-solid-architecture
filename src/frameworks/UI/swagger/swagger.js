// Imports
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const getSwaggerData = require('./getSwaggerData');

// Set Swagger config
const swaggerDocs = swaggerJsdoc({
  swaggerDefinition: getSwaggerData(),
  apis: ['./src/frameworks/web/express/routes/**/*.js'],
});

// Exports
module.exports = {
  serve: swaggerUi.serve,
  UISetup: swaggerUi.setup(swaggerDocs),
};
