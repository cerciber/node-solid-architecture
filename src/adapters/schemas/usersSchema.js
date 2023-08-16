// Imports
const userSchema = require('./userSchema');

// Exports
module.exports = {
  Users: {
    type: 'array',
    items: userSchema,
  },
};
