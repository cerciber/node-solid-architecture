// Define paths container
const paths = {};

// Define paths
paths.root = { path: '', public: false };

// Define docs
paths.apiDocs = { path: `${paths.root.path}/api-docs`, public: true };

// Define API's
paths.fakeApi = { path: `${paths.root.path}/fake-api`, public: false };
paths.api = { path: `${paths.root.path}/api`, public: false };

// Define fake API paths
paths.fakeApiUsers = { path: `${paths.fakeApi.path}/users`, public: false };
paths.fakeApiAuth = { path: `${paths.fakeApi.path}/auth`, public: false };
paths.fakeApiAuthSignIn = {
  path: `${paths.fakeApiAuth.path}/signin`,
  public: true,
};
paths.fakeApiAuthSignUp = {
  path: `${paths.fakeApiAuth.path}/signup`,
  public: true,
};

// Define API paths

// Exports
module.exports = paths;
