import { register, login } from "../../controllers/security/auth";
import { needAuthentication } from  '../../controllers/security/access';

export const AuthRoutes = require('express').Router();

AuthRoutes
    .get('/checkToken', needAuthentication)

    .post('/register', register)

    .post('/login', login);
