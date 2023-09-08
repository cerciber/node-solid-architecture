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
      permissions: { users: ['GET', 'POST', 'PUT', 'DELETE'] },
    },
    {
      id: '2',
      username: 'Bob123',
      password: '$2a$10$LA0U6snM1VGYuS9vyMkJnuUPv/QGStKwotT2BHnQShcAar5YVeQK6',
      permissions: { users: ['GET', 'POST'] },
    },
    {
      id: '3',
      username: 'Fred123',
      password: '$2a$10$LA0U6snM1VGYuS9vyMkJnuUPv/QGStKwotT2BHnQShcAar5YVeQK6',
      rol: 'reader',
      permissions: { users: ['GET'] },
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
