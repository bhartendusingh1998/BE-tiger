const express = require('express');
const dependency_route = express();
const bodyParser  = require('body-parser');

dependency_route.use(bodyParser.json());
dependency_route.use(bodyParser.urlencoded({extended: true}))


const dependencyController = require('../controllers/dependencyController');



dependency_route.get('/get-countries', dependencyController.getCountries);


module.exports = dependency_route;