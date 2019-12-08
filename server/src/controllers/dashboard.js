const express = require('express');
export const DashboardRoutes = express.Router();


DashboardRoutes
    .get('/', (req, res) => res.status(200).json({ data: 'SupWeather API is Alive !' }));

