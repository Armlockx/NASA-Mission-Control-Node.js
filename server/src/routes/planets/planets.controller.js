const {getAllPlanets} = require('../../models/planets.model'); //motherfucking '{planets}' instead of 'planets'

function httpGetAllPlanets(req, res){
    return res.status(200).json(getAllPlanets());
}

module.exports = {
    httpGetAllPlanets,
};