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
        .then(data => res.json({ weather: data }))
        .catch((error) => res.json({ error: error }));
};
