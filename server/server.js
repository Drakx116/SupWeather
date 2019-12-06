const express = require('express');
const app = express();
const port = 3000;

app.route('/')
    .get((req, res) => {
        res.status(200).json({
            data: 'SupWeather API is Alive !'
        })
    });

app.listen(port, () => console.log(`Server is running on localhost:${port}`));
