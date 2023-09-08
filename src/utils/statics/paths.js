// Define paths container
const paths = {};

// Define paths
paths.root = '/';
paths.apiDocs = '/api-docs';
paths.users = '/users';
paths.auth = '/auth';
paths.authSignIn = `${paths.auth}/signin`;
paths.authSignUp = `${paths.auth}/signup`;

// Exports
module.exports = paths;
