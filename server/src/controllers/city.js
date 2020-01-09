import { City } from "../models/City";
import { getCompactWeatherData } from "./weather";

const fetch = require("node-fetch");
const API_TOKEN = require('dotenv').config().parsed.WEATHER_API_KEY;

export const addCityUser = (req, res) =>
{
    const cityName =  req.body.name;
    const userId = req.body.user;

    if(! (cityName && userId)) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    City.findOne(req.body, (error, city) => {
        if (error) {
            return res.json({ error : "Cannot check if the city already exists" });
        }
        else if (city) {
            return res.json({ error : "This city is already stored for the current user" });
        }
        else {
            const city = new City(req.body);
            city.save((error, newCity) => {
                if(error) {
                    return res.json({ error: "Cannot save the city." });
                }

                res.status(201).json({ newCity });
            });
        }
    });
};

export const getCityByNameAndUser = (req, res) => {
    const cityName =  req.body.name;
    const userId = req.body.user;

    if(! (cityName && userId)) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    City.findOne(req.body, (error, city) => {

        if(error || !city) {
            return res.status(404).json({ error: "Cannot find any related city" });
        }

        res.status(200).json(city);
    });
};

export const getUserCityList = (req, res) =>
{
    const userId = req.headers.user;
    if(! userId) {
        return res.status(400).json({ error: 'Cannot find any user' });
    }

    City.find({ user: userId }, (error, cities) => {
        if(error || !cities) {
            return res.status(400).json({ error: 'Cannot find any user cities' });
        }

        const format = 'metric';
        const urls = [];
        cities.forEach((city) => {
            urls.push(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_TOKEN}&units=${format}`)
        });

        // Handles multiple API calls
        Promise.all(urls.map(url =>
            fetch(url)
                .then(res => res.json())
                .catch((error) => console.log(error))
        ))
        .then(data => {
            const weatherData = [];
            data.forEach((cityWeather) => {
                weatherData.push(getCompactWeatherData(cityWeather))
            });

            res.status(200).json({ cities: weatherData });
        });
    });
};
