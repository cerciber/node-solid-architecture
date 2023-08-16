// Imports
const _ = require('lodash');
const {
  getSchemaExample2,
} = require('@src/adapters/controllers/schemas/schemaController');
const userSchema = require('./userSchema');

// Extract example
const exampleItem = getSchemaExample2(userSchema);

// Exports
module.exports = _.cloneDeep({
  Users: {
    type: 'array',
    items: userSchema.User,
    example: [exampleItem, exampleItem, exampleItem],
  },
});
