// Imports
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const config = require('@src/utils/config');
const swaggerData = require('./swaggerData.json');

// Set Swagger config
const swaggerDocs = swaggerJsdoc({
  swaggerDefinition: swaggerData,
  apis: ['./src/frameworks/web/express/routes/**/*.js'],
});

// Exports
module.exports = {
  serve: swaggerUi.serve,
  UISetup: swaggerUi.setup(swaggerDocs),
};
