// Imports

// Database simulation
const database = {
  users: [
    { id: '1', name: 'John' },
    { id: '2', name: 'Jane' },
    { id: '3', name: 'Alice' },
  ],
  authUsers: [
    {
      id: '1',
      username: 'Juan123',
      password: '$2a$10$LA0U6snM1VGYuS9vyMkJnuUPv/QGStKwotT2BHnQShcAar5YVeQK6',
      permissions: [
        {
          pathKey: 'users',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
        },
      ],
    },
    {
      id: '2',
      username: 'Bob123',
      password: '$2a$10$LA0U6snM1VGYuS9vyMkJnuUPv/QGStKwotT2BHnQShcAar5YVeQK6',
      permissions: [
        {
          pathKey: 'users',
          methods: ['GET', 'POST'],
        },
      ],
    },
    {
      id: '3',
      username: 'Fred123',
      password: '$2a$10$LA0U6snM1VGYuS9vyMkJnuUPv/QGStKwotT2BHnQShcAar5YVeQK6',
      rol: 'reader',
      permissions: [{ pathKey: 'users', methods: ['GET'] }],
    },
  ],
  rols: [
    {
      id: 'admin',
      type: 'action',
      data: {
        pathKeys: ['*'],
        methods: ['*'],
      },
    },
    {
      id: 'reader',
      type: 'action',
      data: {
        pathKeys: ['*'],
        methods: ['GET'],
      },
    },
    {
      id: 'user-editor',
      type: 'action',
      data: {
        pathKeys: ['users'],
        methods: ['GET', 'POST', 'PUT'],
      },
    },
    {
      id: 'user-reader-additor',
      type: 'custom',
      data: {
        permissions: [
          { pathKey: ['users'], methods: ['GET'] },
          { pathKey: ['users'], methods: ['POST'] },
        ],
      },
    },
  ],
  _constrains: {
    unique: {
      users: ['id', 'name'],
      authUsers: ['id', 'username'],
    },
  },
};

// Exports
module.exports = { database };
