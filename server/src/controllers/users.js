import { User } from "../models/users";

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export const register = (req, res) => {
    let pseudo = req.body.pseudo;
    let password = req.body.password;

    if( !(pseudo && password) ) {
        res.status(400).json({error: 'Missing parameters'});
    }

    const user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 12);
    user.save((error, newUser) => {
        if(error) return res.status(400).send({ error: error });

        return res.json(newUser);
    });
};
