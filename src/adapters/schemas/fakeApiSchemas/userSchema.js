// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  User: {
    title: 'fakeApiUser',
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
    },
    example: {
      id: '1',
      name: 'Cesar',
    },
    required: ['id', 'name'],
  },
});
