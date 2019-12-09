import { register, login } from "../controllers/auth";

export const AuthRoutes = require('express').Router();

AuthRoutes
    .post('/register', register)

    .post('/login', login);
