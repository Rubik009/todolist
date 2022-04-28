const User = require('../models/users.model');
const Role = require('../models/roles.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config()

const saltRound = 10;

class UsersControllers {
    async registerUser(req, body) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return 'Errors on registration';
        }
        const { username, password, role } = body;
        const candidate = await User.findOne({ username });
        if (candidate) {
            return `User with this ${username} already exist`;
        }
        const hashPassword = await bcrypt.hash(password, saltRound);
        const userRole = new Role({ value: role });
        await userRole.save();
        const user = new User({ username, password: hashPassword, roles: [userRole.value] });
        await user.save();
        return `User added`;
    }
    async loginUser(body) {
        const { username, password} = body;
        const user = await User.findOne({ username });
        if (!user) {
            return `User with ${username} is not founded `;
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return `${password} is not right `;
        }
        const role = user.roles;
        const token = jwt.sign({
            id: user._id,
            user: user.username,
            role : role
        }, process.env.ACCESS_TOKEN_SECRET);
        return `${token}`;
    }
}

module.exports = new UsersControllers();