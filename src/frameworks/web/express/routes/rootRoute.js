// Imports
const express = require('express');
const response = require('@src/adapters/presenters/response');
const sendResponse = require('@src/frameworks/web/express/sendResponse');
const paths = require('@src/utils/statics/paths');
const usersRoute = require('./usersRoute/usersRoute');
const authRoute = require('./authRoute/authRoute');

// Instance router
const router = express.Router();

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
router.get(paths.root, async (req, res) => {
  return sendResponse(
    req,
    res,
    response.success(200, 'System is running.', {})
  );
});

// Include subpaths
router.use(paths.root, usersRoute);
router.use(paths.root, authRoute);

// Exports
module.exports = router;
