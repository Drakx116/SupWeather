import { needAuthentication } from "../controllers/security/access";
import { addCityUser, getCityByNameAndUser } from "../controllers/city";

export const CityRoutes = require('express').Router();

CityRoutes
    .get('/', needAuthentication, getCityByNameAndUser)

    .post('/', needAuthentication, addCityUser);
