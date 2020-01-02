import { DashboardRoutes } from "./src/controllers/dashboard";
import { AuthRoutes } from "./src/routes/security/auth";
import { WeatherRoutes } from './src/routes/weather';

const express = require('express');
const ENV = require('dotenv').config().parsed;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = 3000;

mongoose.connect(ENV.ATLAS_DATABASE_CONNECTION_PATH, { useNewUrlParser: true }).catch(
    () => console.log('An error has occurred while connecting the database.')
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/', DashboardRoutes);
app.use("/auth", AuthRoutes);
app.use('/weather', WeatherRoutes);

app.listen(port, () => console.log(`Server is running on localhost:${port}`));
