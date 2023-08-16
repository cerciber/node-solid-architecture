// Imports
const responseSchema = require('../responseSchema');

// Customizations
const { properties } = responseSchema.Response;
properties.status.example = 200;
properties.message.example = 'Successful operation.';
properties.error.example = false;

// Exports
module.exports = {
  Success: responseSchema.Response,
};
