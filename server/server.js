import { DashboardRoutes } from "./src/controllers/dashboard";
import { UsersRoutes } from "./src/routes/users";

const express = require('express');
const ENV = require('dotenv').config().parsed;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

mongoose.connect(ENV.ATLAS_DATABASE_CONNECTION_PATH, { useNewUrlParser: true }).catch(
    () => console.log('An error has occurred while connecting the database.')
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// JWT
app.use((req, res, next) => {
    if (!req.headers.authorizations) {
        req.user = undefined;
        next();
    }
    else {
        jwt.verify(req.headers.authorizations, ENV.JWT_SECRET, (error, decode) => {
            if (error ) {
                res.json({ error: 'Cannot authenticate user.' });
            }

            req.user = decode;
            next();
        });
    }

});

app.use('/', DashboardRoutes);
app.use("/auth", UsersRoutes);

app.listen(port, () => console.log(`Server is running on localhost:${port}`));
