import { register, login, needAuthentication, getUsers } from "../controllers/users";

export const UsersRoutes = require('express').Router();


UsersRoutes
    .get('/users', needAuthentication, getUsers)

    .post('/register', register)

    .post('/login', login);
