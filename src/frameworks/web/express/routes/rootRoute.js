// Imports
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();
const fakeApiRoute = require('./fakeApiRoute/fakeApiRoute');

// Include subpaths
router.router.use(paths.root.path, fakeApiRoute.router);

// Exports
module.exports = router;
