// Imports
const express = require('express');
const response = require('@src/frameworks/web/express/response');
const usersRoute = require('./usersRoute/usersRoute');

// Instance router
const router = express.Router();

/**
 * @swagger
 * /:
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
router.get('/', async (req, res) => {
  await response.success(req, res, 200, 'System is running.', {});
});

// Include subpaths
router.use('/users', usersRoute);

// Exports
module.exports = router;
