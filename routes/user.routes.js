const express = require("express");
const router = express.Router();
const UsersControllers = require('../controllers/users.controller');
const ToDoListController = require ('../controllers/todoList.controller');
const {check} = require('express-validator');
const authenticatToken = require('../middleware/auth');
const roleAuthenticatToken = require('../middleware/role.auth');

router.post("/register", [
    check('username', 'username should not be empty').notEmpty(),
    check('password', 'password should be at least 4 symbols').isLength({min : 4})
], async (req, res) => {
    try {
        const user = await UsersControllers.registerUser(req, req.body);
        res.send(user)
    } catch (err) {
        res.status(400).json({ message: 'Registration failed' })
    }
});
router.post('/login', async (req, res) => {
    try {
        const token = await UsersControllers.loginUser(req.body);
        res.json(token);
    } catch (err) {
        res.status(400).json({ message: 'Login failed' })
    }
});
router.get("/todos",roleAuthenticatToken('admin'), async (req, res) => {
    try {
        const tasks = await ToDoListController.getTasks();
        res.status(200).json(tasks);
    } catch (err) {
        console.log({ message: 'user is not autorized' })
    }
});

module.exports = router;