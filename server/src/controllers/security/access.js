const jwt = require('jsonwebtoken');
const ENV = require('dotenv').config().parsed;

export const needAuthentication = function(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error : 'No token provided.' });
    }

    jwt.verify(token, ENV.JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.status(401).send({ error : 'Invalid token.' });
        } else {
            req.pseudo = decoded.pseudo;
            next();
        }
    });
};

export const checkClientToken = (req, res) => {
    const clientToken = req.headers.authorization;

    if(!clientToken) {
        return res.status(401).json({ error: { status: 0 } });
    }

    jwt.verify(clientToken, ENV.JWT_SECRET, function(err) {
        return (err)
             ? res.status(401).json({ error: { status : 1 } })
             : res.status(200).json({ data: 'Valid token' });
    });
};
