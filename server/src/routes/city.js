import { needAuthentication } from "../controllers/security/access";
import {addCityUser, deleteCityUser, getCityByNameAndUser} from "../controllers/city";

export const CityRoutes = require('express').Router();

CityRoutes
    .get('/', needAuthentication, getCityByNameAndUser)

    .post('/', needAuthentication, addCityUser)

    .post('/delete', needAuthentication, deleteCityUser);
