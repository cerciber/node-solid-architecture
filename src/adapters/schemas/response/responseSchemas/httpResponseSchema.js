// Imports
const responseSchema = require('../responseSchema');

// Exports
module.exports = {
  description: 'Description.',
  content: {
    'application/json': {
      schema: responseSchema,
    },
  },
};
