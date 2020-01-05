const fetch = require("node-fetch");
const API_TOKEN = require('dotenv').config().parsed.WEATHER_API_KEY;
const format = 'metric';

export const getCityWeather = (req, res) => {
    const city = req.params.city;
    if(! city) {
        res.json({ error: 'Undefined city' });
    }

    /**
     * URL parameters :
     *  - q : City
     *  - app id : Personal API Token
     *  - Units : Temperature units (metric : Celsius)
     */
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_TOKEN}&units=${format}`, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            const sanitizedWeatherData = getDetailedWeatherData(data);
            res.json({ weather: sanitizedWeatherData })
        })

        .catch((error) => res.json({ error: error }));
};

const getDetailedWeatherData = (weather) => {
    return {
        city: weather.name,
        status: weather.weather.main,
        description: weather.weather.description,
        humidity: weather.main.humidity,
        temperature: {
            current: weather.main.temp,
            mix: weather.main.temp_min,
            max: weather.main.temp_max,
            feels_like: weather.main.feels_like
        },
        wind: {
            speed: weather.wind.speed,
            direction: weather.wind.deg,
        }
    };
};
