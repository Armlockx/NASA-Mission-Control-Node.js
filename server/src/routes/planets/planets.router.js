const express = require('express');

const {             //instead of 'const planetsController' 'planetsController.getAllPlanets'
    getAllPlanets,
} = require('./planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets);   //localhost/planets (creates the path)

module.exports = planetsRouter;