import { needAuthentication } from "../controllers/auth";
import { getUsers } from "../controllers/users";

export const UserRoutes = require('express').Router();

UserRoutes
    .get('/', needAuthentication, getUsers);
