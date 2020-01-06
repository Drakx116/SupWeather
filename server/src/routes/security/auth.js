import { register, login, logout } from "../../controllers/security/auth";
import { needAuthentication } from  '../../controllers/security/access';

export const AuthRoutes = require('express').Router();

AuthRoutes
    .post('/register', register)

    .post('/login', login)

    .post('/logout', needAuthentication, logout);
