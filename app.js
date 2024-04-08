const express = require('express');
const app = express();
const cors = require('cors');
const dbConnect = require('./db/dbConnect');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/user');
const userDetailsRoutes = require('./api/routes/userDetails');
const bodyParser = require('body-parser');
const urlencoded = require('body-parser/lib/types/urlencoded');
const dependencyRoute = require('./api/routes/dependenciesRoutes')


app.use('/api', dependencyRoute);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/userDetails', userDetailsRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        error: 'url not found'
    })
})


module.exports = app;