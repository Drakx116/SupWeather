import { DashboardRoutes } from "./src/controllers/dashboard";
import { AuthRoutes } from "./src/routes/security/auth";
import { WeatherRoutes } from './src/routes/weather';
import { CityRoutes } from "./src/routes/city";

const express = require('express');
const ENV = require('dotenv').config().parsed;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const limiter = new RateLimit({
    windowMs: 1000,
    max: 10,
    delayMs: 0
});

const app = express();
const port = 3000;

mongoose.connect(ENV.ATLAS_DATABASE_CONNECTION_PATH, { useNewUrlParser: true, useUnifiedTopology: true }).catch(
    () => console.log('An error has occurred while connecting the database.')
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(limiter);

app.use('/', DashboardRoutes);
app.use("/auth", AuthRoutes);
app.use('/weather', WeatherRoutes);
app.use('/city', CityRoutes);

app.listen(port, () => console.log(`Server is running on localhost:${port}`));
