// Imports
const swaggerJsdoc = require('swagger-jsdoc');
const paths = require('@src/utils/statics/paths');
const loadSchemasFromFolder = require('./loadSchemasFromFolder');

// Get Swagger Data
function getSwaggerData() {
  // Load schemas
  const dataSchemas = loadSchemasFromFolder('@src/adapters/schemas');

  // Load response schemas
  const responseSchemas = loadSchemasFromFolder(
    '@src/adapters/schemas/response/responseSchemas/httpResponseSchemas'
  );

  // Swagger data import
  // eslint-disable-next-line global-require
  const swaggerData = require('./swaggerData.json');

  // Set Schemas
  swaggerData.components.schemas = dataSchemas;

  // Set response schemas
  swaggerData.components.responses = responseSchemas;

  // Set Swagger config
  const swaggerDocs = swaggerJsdoc({
    swaggerDefinition: swaggerData,
    apis: ['./src/frameworks/web/express/routes/**/*.js'],
  });

  // Change paths references
  Object.keys(swaggerDocs.paths).forEach((path) => {
    const match = path.match(/\${([^}]+)}/);
    if (match) {
      const value = match[1];
      const expresionToReplace = match[0];
      const resultPath = path.replace(expresionToReplace, paths[value].path);
      swaggerDocs.paths[resultPath] = swaggerDocs.paths[path];
      delete swaggerDocs.paths[path];
    }
  });

  return swaggerDocs;
}

// Exports
module.exports = getSwaggerData;
