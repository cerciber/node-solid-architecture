// Imports
const errorSchema = require('../errorSchema');
const httpResponseSchema = require('../httpResponseSchema');

// Customizations
const { properties } = errorSchema.Error;
properties.status.example = 500;
properties.message.example = 'An error occurred on server.';
httpResponseSchema.description = properties.message.example;
httpResponseSchema.content['application/json'].schema = errorSchema.Error;

// Exports
module.exports = {
  [properties.status.example]: httpResponseSchema,
};
