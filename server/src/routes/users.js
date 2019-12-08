import { register } from "../controllers/users";

export const UsersRoutes = require('express').Router();


UsersRoutes
    .post('/register', (req, res) => register(req, res));

