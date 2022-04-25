const jwt = require('jsonwebtoken');
require('dotenv').config()

function roleAuthenticatToken(roles) {
    return function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) {
                res.sendStatus(401);
            }
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) throw new Error('invalid token');
                if(!user.role === roles){
                    return`You don't have access`;
                }
                next();
            });
        } catch (err) {
            res.sendStatus(403);
        }
    }
}

module.exports = roleAuthenticatToken;