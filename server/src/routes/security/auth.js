import { register, login, logout } from "../../controllers/security/auth";
import { checkClientToken, needAuthentication } from '../../controllers/security/access';

export const AuthRoutes = require('express').Router();

AuthRoutes
    .get('/checkToken', checkClientToken)

    .post('/register', register)

    .post('/login', login)

    .post('/logout', needAuthentication, logout);
