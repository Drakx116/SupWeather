import { DashboardRoutes } from "./src/controllers/dashboard";
import { AuthRoutes } from "./src/routes/auth";
import { UserRoutes } from "./src/routes/users";

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
    if (!req.headers.authorization) {
        req.user = undefined;
    }
    else {
        jwt.verify(req.headers.authorization, ENV.JWT_SECRET, (error, decode) => {
            if (error ) {
                res.json({ error: 'Cannot authenticate user.' });
            }

            req.user = decode;
        });
    }

    next();
});

app.use('/', DashboardRoutes);
app.use("/auth", AuthRoutes);
app.use('/users', UserRoutes);

app.listen(port, () => console.log(`Server is running on localhost:${port}`));
