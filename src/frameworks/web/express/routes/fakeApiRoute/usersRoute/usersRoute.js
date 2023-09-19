// Imports
const sendResponse = require('@src/frameworks/web/express/sendResponse');
const {
  getUserslistController,
  getUserByIdController,
  addUserController,
  updateUserController,
  removeUserController,
} = require('@src/adapters/controllers/apisController/fakeApiControllers/user/userController');
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();

/**
 * @swagger
 * ${fakeApiUsers}:
 *   get:
 *     tags:
 *       - FakeAPI
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
router.get(paths.fakeApiUsers.path, async (req, res) => {
  return sendResponse(req, res, await getUserslistController());
});

/**
 * @swagger
 * ${fakeApiUsers}/{id}:
 *   get:
 *     tags:
 *       - FakeAPI
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
router.get(`${paths.fakeApiUsers.path}/:id`, async (req, res) => {
  return sendResponse(req, res, await getUserByIdController(req.params));
});

/**
 * @swagger
 * ${fakeApiUsers}:
 *   post:
 *     tags:
 *       - FakeAPI
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
router.post(paths.fakeApiUsers.path, async (req, res) => {
  return sendResponse(req, res, await addUserController(req.body));
});

/**
 * @swagger
 * ${fakeApiUsers}/{id}:
 *   put:
 *     tags:
 *       - FakeAPI
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
router.put(`${paths.fakeApiUsers.path}/:id`, async (req, res) => {
  return sendResponse(
    req,
    res,
    await updateUserController(req.params, req.body)
  );
});

/**
 * @swagger
 * ${fakeApiUsers}/{id}:
 *   delete:
 *     tags:
 *       - FakeAPI
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
router.delete(`${paths.fakeApiUsers.path}/:id`, async (req, res) => {
  return sendResponse(req, res, await removeUserController(req.params));
});

// Exports
module.exports = router;
