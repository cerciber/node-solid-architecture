module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Node clean architecture',
    description:
      'Solid architecture for Node.js implementing Clean Architecture. Node.js.',
    termsOfService: '',
    contact: {
      email: 'cerciber@hotmail.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
    version: '1.0.1',
  },
  externalDocs: {
    description: 'Find out more about Node clean architecture',
    url: 'https://github.com/cerciber/node-solid-architecture',
  },
  servers: [
    {
      url: 'http://localhost:3009/',
    },
  ],
  tags: [
    {
      name: 'General',
      description: 'General requests.',
    },
  ],
  components: {
    schemas: {},
    responses: {},
  },
};
