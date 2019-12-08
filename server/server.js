import { DashboardRoutes } from "./src/controllers/dashboard";
import { UsersRoutes } from "./src/routes/users";

const express = require('express');
const ENV = require('dotenv').config().parsed;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect(ENV.ATLAS_DATABASE_CONNECTION_PATH, { useNewUrlParser: true }).catch(
    () => console.log('An error has occurred while connecting the database.')
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', DashboardRoutes);
app.use("/auth", UsersRoutes);

app.listen(port, () => console.log(`Server is running on localhost:${port}`));
