const jwt = require('jsonwebtoken');
const ENV = require('dotenv').config().parsed;

export const needAuthentication = function(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error : 'No token provided.' });
    }

    else {
        jwt.verify(token, ENV.JWT_SECRET, function(err, decoded) {
            if (err) {
                return res.status(401).send({ error : 'Invalid token.' });
            } else {
                req.pseudo = decoded.pseudo;
                next();
            }
        });
    }
};