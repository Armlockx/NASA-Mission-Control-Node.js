const {planets} = require('../../models/planets.model'); //motherfucking '{planets}' instead of 'planets'

function getAllPlanets(req, res){
    return res.status(200).json(planets);
}

module.exports = {
    getAllPlanets,
};