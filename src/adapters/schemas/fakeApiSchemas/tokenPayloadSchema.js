// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  TokenPayload: {
    title: 'fakeApiTokenPayload',
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      iat: {
        type: 'number',
      },
      exp: {
        type: 'number',
      },
    },
    example: {
      id: '9I09J87H87',
      iat: 1694641900,
      exp: 1694645500,
    },
    required: ['id', 'iat', 'exp'],
  },
});
