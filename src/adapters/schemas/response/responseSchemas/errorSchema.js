// Imports
const responseSchema = require('../responseSchema');

// Customizations
const { properties } = responseSchema.Response;
properties.status.example = 500;
properties.message.example = 'An error occurred on the operation.';
properties.error.example = true;

// Exports
module.exports = {
  Error: responseSchema.Response,
};
