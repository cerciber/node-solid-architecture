// Imports
const express = require('express');
const response = require('@response');
const {
  getUserslistController,
  getUserByIdController,
  addUserController,
  updateUserController,
  removeUserController,
} = require('@src/adapters/controllers/user/userController');

// Instance router
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get the list of users
 *     description: Returns a list of all registered users.
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
 *           - description: List of users obtained successfully.
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
router.get('/', async (req, res) => {
  return response.success(
    req,
    res,
    200,
    'Users retrieved successfully.',
    await getUserslistController()
  );
});

/**
 * @swagger
 * /users/{id}:
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
 *           - description: User obtained successfully.
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                       $ref: '#/components/schemas/User'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  return response.success(
    req,
    res,
    200,
    'User obtained successfully.',
    await getUserByIdController(userId)
  );
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
router.post('/', async (req, res) => {
  const newUser = req.body;
  return response.success(
    req,
    res,
    201,
    'User created successfully.',
    await addUserController(newUser)
  );
});

/**
 * @swagger
 * /users/{id}:
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
 *           - description: User updated successfully.
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                        $ref: '#/components/schemas/User'
 *       404:
 *         allOf:
 *           - $ref: '#/components/responses/404'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const result = await updateUserController(userId, updatedUser);
  if (result) {
    return response.success(
      req,
      res,
      200,
      'User updated successfully.',
      result
    );
  }
  return response.error(req, res, 404, 'User does not exist.', {});
});

/**
 * @swagger
 * /users/{id}:
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
 *           - description: User deleted successfully.
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                        $ref: '#/components/schemas/User'
 *       404:
 *         allOf:
 *           - $ref: '#/components/responses/404'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  const result = await removeUserController(userId);
  if (result) {
    return response.success(
      req,
      res,
      200,
      'User deleted successfully.',
      result
    );
  }
  return response.error(req, res, 404, 'User does not exist.', {});
});

// Exports
module.exports = router;
