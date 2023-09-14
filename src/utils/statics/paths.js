// Define paths container
const paths = {};

// Define paths
paths.root = { path: '', public: false };

paths.apiDocs = { path: `${paths.root.path}/api-docs`, public: true };
paths.users = { path: `${paths.root.path}/users`, public: false };
paths.auth = { path: `${paths.root.path}/auth`, public: false };

paths.authSignIn = { path: `${paths.auth.path}/signin`, public: true };
paths.authSignUp = { path: `${paths.auth.path}/signup`, public: true };

// Exports
module.exports = paths;
