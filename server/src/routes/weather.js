import { getCityWeather } from "../controllers/weather";

export const WeatherRoutes = require('express').Router();

WeatherRoutes
    .get('/city/:city', getCityWeather);
