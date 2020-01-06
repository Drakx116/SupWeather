import { User } from "../../models/User";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ENV = require('dotenv').config().parsed;

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

export const login = (req, res) =>
{
    User.findOne({ pseudo: req.body.pseudo }, (error, user) =>
    {
        // Checks parameters
        if( !(req.body.pseudo && req.body.password) ) {
            return res.status(400).json({ error: 'Missing parameters' });
        }

        if(error || !(user)) {
            return res.status(404).json({ error: 'Cannot find any related user.'} );
        }

        if(!(User.checkPasswords(req.body.password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Generates and sets user token
        const token = jwt.sign({ email: user.pseudo, id: user._id }, ENV.JWT_SECRET );

        res.cookie('user', user._id, { httpOnly: true });

        res.cookie('token', token, { httpOnly: true }).status(200).json({
            id: user._id,
            pseudo: user.pseudo,
            token: token
        })
    });
};

export const logout = (req, res) =>
{
    // Cookie is already checked in the 'needAuthentication' method
    res.clearCookie('token');
    res.clearCookie('user');

    res.json({
        'message': 'User disconnected'
    });
};
