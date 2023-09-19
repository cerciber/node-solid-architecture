// Imports
const _ = require('lodash');
const {
  getSchemaExampleFromExamples,
} = require('@src/adapters/controllers/schemas/schemaController');
const userSchema = require('./userSchema');

// Extract example
const exampleItem = getSchemaExampleFromExamples(userSchema);

// Exports
module.exports = _.cloneDeep({
  Users: {
    title: 'fakeApiUsers',
    type: 'array',
    items: userSchema.User,
    example: [exampleItem, exampleItem, exampleItem],
  },
});
