module.exports = {
  enviroment: process.env.ENV || 'develop',
  frameworks: {
    web: {
      express: {
        port: process.env.EXPRESS_PORT || 3000,
      },
    },
  },
  application: {
    jwtSectetKey: process.env.JWT_SECRET_KEY || 'SECRET_KEY',
    jwtDuration: process.env.JWT_DURATION || '1h',
  },
  entities: {
    passwordEncryptSaltRounds:
      Number(process.env.PASSWORD_ENCRYPT_SALT_ROUNDS) || 10,
  },
};
