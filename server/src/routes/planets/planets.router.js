const express = require('express');

const {             //instead of 'const planetsController' 'planetsController.getAllPlanets'
    httpGetAllPlanets,
} = require('./planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/', httpGetAllPlanets);   //localhost/planets (creates the path)

module.exports = planetsRouter;