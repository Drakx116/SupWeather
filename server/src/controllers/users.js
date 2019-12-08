import { User } from "../models/users";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ENV = require('dotenv').config().parsed;

export const getUsers = (req, res) => {
    User.find({}, (error, users) => {
        if(error) {
            res.status(401).send('Cannot get users');
        }
        else {
            res.status(200).send({ users });
        }
    });
};

export const register = (req, res) =>
{
    // Checks parameters
    if( !(req.body.pseudo && req.body.password) ) {
        res.status(400).json({ error: 'Missing parameters' });
    }

    // Add unique email constraint validation
    const user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 12);
    user.save((error, newUser) => {
        if(error) {
            res.status(500).json({ error: 'Cannot save the user.' });
        }

        res.status(201).json(newUser);
    });
};

export const login = (req, res) => {
    User.findOne({ pseudo: req.body.pseudo }, (error, user) =>
    {
        // Checks parameters
        if( !(req.body.pseudo && req.body.password) ) {
            res.status(400).json({ error: 'Missing parameters' });
        }

        if(error || !(user))
            res.status(401).json({ error: 'Cannot find any related user.'} );

        if(!(User.checkPasswords(req.body.password, user.password)))
            res.status(401).json({ error: 'Invalid credentials.' });

        // Generates and sets user token
        const userToken = jwt.sign({ email: user.pseudo, id: user._id }, ENV.JWT_SECRET );

        req.headers.authorizations = userToken;
        console.log(req.headers.authorizations);

        res.json({
            message: 'Authenticated user',
            token: userToken
        });
    });
};

export const needAuthentication = (req, res, next) => {
    if(req.user) {
        next();
    }
    else {
        res.status(401).json({ error: 'Invalid token.' });
    }
};
