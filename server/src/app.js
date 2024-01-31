const express = require('express');
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router')

const app = express();  //request comes in to express

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());//gets checked for Content-Type
app.use(planetsRouter); //then goes to express router to handle the /planets routes

module.exports = app;