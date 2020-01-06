import { getCityWeather } from "../controllers/weather";
import { getUserCityList } from "../controllers/city";
import {needAuthentication} from "../controllers/security/access";

export const WeatherRoutes = require('express').Router();

WeatherRoutes
    .get('/city/list', needAuthentication, getUserCityList)

    .get('/city/:city', needAuthentication, getCityWeather);
