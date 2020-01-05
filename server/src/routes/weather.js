import { getCityWeather } from "../controllers/weather";
import {needAuthentication} from "../controllers/security/access";

export const WeatherRoutes = require('express').Router();

WeatherRoutes
    .get('/city/:city', needAuthentication, getCityWeather);
