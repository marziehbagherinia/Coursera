const config = require('config');
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header('x-authentication-token');
    if (!token) return res.status(401).send('Access denied. No Token Provided!');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch (ex) {
        return res.status(400).send('Invalid Token!');
    }
}

module.exports = auth;