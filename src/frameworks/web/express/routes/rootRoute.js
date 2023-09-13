// Imports
const response = require('@src/adapters/presenters/response');
const sendResponse = require('@src/frameworks/web/express/sendResponse');
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();
const usersRoute = require('./usersRoute/usersRoute');
const authRoute = require('./authRoute/authRoute');

/**
 * @swagger
 * ${root}:
 *   get:
 *     tags:
 *       - General
 *     summary: Validate root of API
 *     description: Returns a meesage that indicate that system is running.
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
 *           - content:
 *              application/json:
 *                schema:
 *                  properties:
 *                    message:
 *                      example: System is running.
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.get(paths.root.path, async (req, res) => {
  return sendResponse(
    req,
    res,
    response.success(200, 'System is running.', {})
  );
});

// Include subpaths
router.router.use(paths.root.path, usersRoute.router);
router.router.use(paths.root.path, authRoute.router);

// Exports
module.exports = router;
