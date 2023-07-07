// Imports
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('@src/utils/config')

// Set Swagger config
const swaggerDocs = swaggerJsdoc(config.frameworks.UI.swagger.swaggerOptions);

// Exports
module.exports = {
    serve: swaggerUi.serve,
    UISetup: swaggerUi.setup(swaggerDocs)
}