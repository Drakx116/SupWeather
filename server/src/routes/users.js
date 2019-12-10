import { needAuthentication } from "../controllers/security/access"
import { getUsers } from "../controllers/users";

export const UserRoutes = require('express').Router();

UserRoutes
    .get('/', needAuthentication, getUsers);
