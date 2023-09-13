// Imports
const sendResponse = require('@src/frameworks/web/express/sendResponse');
const {
  signinUserAuthController,
  signupUserAuthController,
} = require('@src/adapters/controllers/auth/authUserController');
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();

/**
 * @swagger
 * ${authSignIn}:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Authenticate user on system.
 *     description: Validate user Authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAuth'
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                        $ref: '#/components/schemas/User'
 *       400:
 *         allOf:
 *           - $ref: '#/components/responses/400'
 *       404:
 *         allOf:
 *           - $ref: '#/components/responses/404'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.post(paths.authSignIn.path, async (req, res) => {
  return sendResponse(req, res, await signinUserAuthController(req.body));
});

/**
 * @swagger
 * ${authSignUp}:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Regiter an user authentication
 *     description: Regiter an user authentication with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAuth'
 *     responses:
 *       201:
 *         allOf:
 *           - $ref: '#/components/responses/201'
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                        $ref: '#/components/schemas/User'
 *       400:
 *         allOf:
 *           - $ref: '#/components/responses/400'
 *       409:
 *         allOf:
 *           - $ref: '#/components/responses/409'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.post(paths.authSignUp.path, async (req, res) => {
  return sendResponse(req, res, await signupUserAuthController(req.body));
});

// Exports
module.exports = router;
