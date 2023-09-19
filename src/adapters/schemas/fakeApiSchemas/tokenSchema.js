// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  Token: {
    title: 'fakeApiToken',
    type: 'string',
    example: '34FR34R34R34R',
    required: true,
  },
});
