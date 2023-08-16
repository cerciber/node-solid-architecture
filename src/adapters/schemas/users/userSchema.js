// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  User: {
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
  },
});
