import { register, login } from "../controllers/users";

export const UsersRoutes = require('express').Router();


UsersRoutes
    .post('/register', (req, res) => register(req, res))

    .post('/login', (req, res) => login(req, res));
