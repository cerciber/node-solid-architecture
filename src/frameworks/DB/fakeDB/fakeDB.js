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
      authorization: {
        type: 'rol',
        rol: 'admin',
      },
    },
    {
      id: '2',
      username: 'Bob123',
      password: '$2a$10$LA0U6snM1VGYuS9vyMkJnuUPv/QGStKwotT2BHnQShcAar5YVeQK6',
      authorization: {
        type: 'rol',
        rol: 'reader',
      },
    },
    {
      id: '3',
      username: 'Fred123',
      password: '$2a$10$LA0U6snM1VGYuS9vyMkJnuUPv/QGStKwotT2BHnQShcAar5YVeQK6',
      authorization: {
        type: 'rol',
        rol: 'user-editor',
      },
    },
    {
      id: '4',
      username: 'Maria123',
      password: '$2a$10$LA0U6snM1VGYuS9vyMkJnuUPv/QGStKwotT2BHnQShcAar5YVeQK6',
      authorization: {
        type: 'custom',
        permissions: [{ pathKeys: ['users'], methods: ['GET'] }],
      },
    },
  ],
  rols: [
    {
      id: '1',
      key: 'admin',
      permissions: [
        {
          pathKeys: ['*'],
          methods: ['*'],
        },
      ],
    },
    {
      id: '2',
      key: 'reader',
      permissions: [
        {
          pathKeys: ['*'],
          methods: ['GET'],
        },
      ],
    },
    {
      id: '3',
      key: 'user-editor',
      permissions: [
        {
          pathKeys: ['users'],
          methods: ['GET', 'POST', 'PUT'],
        },
      ],
    },
    {
      id: '4',
      key: 'user-reader-additor',
      permissions: [{ pathKeys: ['users'], methods: ['GET'] }],
    },
  ],
  _constrains: {
    unique: {
      users: ['id', 'name'],
      authUsers: ['id', 'username'],
      rols: ['id', 'key'],
    },
  },
};

// Exports
module.exports = { database };
