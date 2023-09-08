// Imports
const express = require('express');
const sendResponse = require('@src/frameworks/web/express/sendResponse');
const {
  getUserslistController,
  getUserByIdController,
  addUserController,
  updateUserController,
  removeUserController,
} = require('@src/adapters/controllers/user/userController');
const paths = require('@src/utils/statics/paths');

// Instance router
const router = express.Router();

/**
 * @swagger
 * ${users}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get the list of users
 *     description: Returns a list of all registered users.
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                       $ref: '#/components/schemas/Users'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.get(paths.users.path, async (req, res) => {
  return sendResponse(req, res, await getUserslistController());
});

/**
 * @swagger
 * ${users}/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a user by ID
 *     description: Retrieves a user based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve.
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                       $ref: '#/components/schemas/User'
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
router.get(`${paths.users.path}:id`, async (req, res) => {
  return sendResponse(req, res, await getUserByIdController(req.params));
});

/**
 * @swagger
 * ${users}:
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
router.post(paths.users.path, async (req, res) => {
  return sendResponse(req, res, await addUserController(req.body));
});

/**
 * @swagger
 * ${users}/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user by ID
 *     description: Updates an existing user with the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
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
router.put(`${paths.users.path}:id`, async (req, res) => {
  return sendResponse(
    req,
    res,
    await updateUserController(req.params, req.body)
  );
});

/**
 * @swagger
 * ${users}/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user by ID
 *     description: Deletes an existing user based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete.
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
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
router.delete(`${paths.users.path}:id`, async (req, res) => {
  return sendResponse(req, res, await removeUserController(req.params));
});

// Exports
module.exports = router;
