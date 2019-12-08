import { User } from "../models/users";

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ENV = require('dotenv').config().parsed;

export const register = (req, res) =>
{
    // Checks parameters
    if( !(req.body.pseudo && req.body.password) ) {
        res.status(400).json({ error: 'Missing parameters' });
    }

    // Add unique email constraint
    const user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 12);
    user.save((error, newUser) => {
        if(error) return res.status(500).json({ error: 'Cannot save the user.' });

        return res.json(newUser);
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
            return res.status(401).json({ error: 'Cannot find any related user.'} );

        if(!(User.checkPasswords(req.body.password, user.password)))
            return res.status(401).json({ error: 'Invalid credentials.' });

        return res.json({
            token: jwt.sign({ email: user.pseudo, id: user._id }, ENV.JWT_SECRET )
        });
    });
};
