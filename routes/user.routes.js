const express = require("express");
const router = express.Router();
const UsersControllers = require('../controllers/users.controller');
const ToDoListController = require('../controllers/todoList.controller');
const { check } = require('express-validator');
const authenticatToken = require('../middleware/auth');
const roleAuthenticatToken = require('../middleware/role.auth');


/**
 * @swagger
 *  /api/user/register:
 *    post:
 *      description: 
 *          Register.
 *      tags:
 *          - Users
 *      parameters:
 *        - name: user 
 *          in: body
 *          description: user object
 *          required: true
 *          schema:
 *            $ref: '#/definitions/User'
 *      responses:
 *        200:
 *          description: User registration
 *          schema:
 *              title: Return String
 *              type: string
 *              example: "User added"
 * definitions:
 *   User:
 *     description: User object
 *     properties:
 *       username:
 *         type: string
 *         example: alesia
 *         description: username
 *       password:
 *         type: string
 *         example: 'alesia'
 *         description: user password
 *       role:
 *         type: string
 *         example: 'admin'
 *         description: user role 
 *     required:
 *      - username
 *      - password
 *      - role
 */
router.post("/register", [
    check('username', 'username should not be empty').notEmpty(),
    check('password', 'password should be at least 4 symbols').isLength({ min: 4 })
], async (req, res) => {
    try {
        const user = await UsersControllers.registerUser(req, req.body);
        res.send(user)
    } catch (err) {
        res.status(400).json({ message: 'Registration failed' })
    }
});


/**
 * @swagger
 *  /api/user/login:
 *    post:
 *      description: 
 *          Login.
 *      tags:
 *          - Users
 *      parameters:
 *        - name: user 
 *          in: body
 *          description: user object
 *          required: true
 *          schema:
 *            $ref: '#/definitions/User'
 *      responses:
 *        200:
 *          description: Successful response
 *          schema:
 *              title: Return String
 *              type: string
 *              example: "succesfully"
 * definitions:
 *   User:
 *     description: User object
 *     properties:
 *       username:
 *         type: string
 *         example: roma
 *         description: user login
 *       password:
 *         type: string
 *         example: 'roma'
 *         description: user password 
 *     required:
 *      - username
 *      - password
 */
router.post('/login', async (req, res) => {
    try {
        const token = await UsersControllers.loginUser(req.body);
        res.json({ Bearer: token });
    } catch (err) {
        res.status(400).json({ message: 'Login failed' })
    }
});

/**
 * @swagger
 * /api/user/todos:
 *  get:
 *      description: Use this URL to see all tasks
 *      tags:
 *          - Users
 *      parameters:
 *        - name: authorization
 *          in: header
 *          type: string
 *          required: true
 *      responses:
 *          '200':
 *              description: Успешный ответ
 */
router.get("/todos", roleAuthenticatToken('admin'), async (req, res) => {
    try {
        const tasks = await ToDoListController.getTasks();
        res.status(200).json({ message: 'List of tasks', tasks });
    } catch (err) {
        console.log({ message: 'user is not autorized' })
    }
});

module.exports = router;