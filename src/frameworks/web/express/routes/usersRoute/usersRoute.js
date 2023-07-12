// Imports
const express = require('express')
const response = require('@src/frameworks/web/express/response')
const { list, get, add, update, remove } = require('@src/adapters/controllers/userController')

// Instance router
const router = express.Router()

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
 *                        $ref: '#/components/schemas/Users'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.get('/', (req, res) => {
    response.success(req, res, 200, 'Usuarios obtenidos correctamente.', list())
})

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
 *                        $ref: '#/components/schemas/Users'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    response.success(req, res, 200, 'Usuario obtenido correctamente.', get(userId))
})

router.post('/', (req, res) => {
    const newUser = req.body;
    response.success(req, res, 200, 'Usuario creado correctamente.', add(newUser))
})

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    response.success(req, res, 200, 'Usuario actualizado correctamente.', update(userId, updatedUser))
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    response.success(req, res, 200, 'Usuario actualizado correctamente.', remove(userId))
});


// Exports
module.exports = router
