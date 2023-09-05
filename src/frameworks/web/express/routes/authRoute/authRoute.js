// Imports
const express = require('express');
const sendResponse = require('@src/frameworks/web/express/sendResponse');
const {
  signinUserAuthController,
  signupUserAuthController,
} = require('@src/adapters/controllers/authUser/authUserController');

// Instance router
const router = express.Router();

/**
 * @swagger
 * /signup:
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         allOf:
 *           - $ref: '#/components/responses/201'
 *           - description: User registered successfully.
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                        $ref: '#/components/schemas/User'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.post('/signup', async (req, res) => {
  return sendResponse(req, res, await signupUserAuthController(req.body));
});

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: Creates a new user with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         allOf:
 *           - $ref: '#/components/responses/201'
 *           - description: User created successfully.
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                        $ref: '#/components/schemas/User'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.post('/signin', async (req, res) => {
  return sendResponse(req, res, await signinUserAuthController(req.body));
});

// Exports
module.exports = router;
