const path = require('path');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ['prettier', 'json'],
  rules: { 'prettier/prettier': 'error', 'json/*': ['error', 'allowComments'] },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@src', path.resolve(__dirname, './src')],
          [
            '@response',
            path.resolve(__dirname, './src/adapters/presenters/response.js'),
          ],
          ['@express', path.resolve(__dirname, './src/frameworks/web/express')],
        ],
        extensions: ['.js'],
      },
    },
  },
};