module.exports = {
  enviroment: process.env.ENV || 'develop',
  frameworks: {
    web: {
      express: {
        port: process.env.EXPRESS_PORT || 3000,
      },
    },
    UI: {
      swagger: {
        swaggerOptions: {
          swaggerDefinition: {
            info: {
              title: 'Node clean architecture',
              version: '1.0.0',
              description:
                'Docs of Solid architecture for Node.js implementing Clean Architecture. Node.js.',
            },
          },
          apis: ['./src/frameworks/web/express/routes/**/*.js'],
        },
      },
    },
  },
};
