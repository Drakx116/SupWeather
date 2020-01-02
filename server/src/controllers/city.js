import {City} from "../models/City";

export const addCityUser = (req, res) =>
{
    const cityName =  req.body.name.toUpperCase();
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
