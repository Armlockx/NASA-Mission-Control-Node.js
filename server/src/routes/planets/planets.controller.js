const { getAllPlanets } = require('../../models/planets.model'); //motherfucking '{planets}' instead of 'planets'

async function httpGetAllPlanets(req, res){
    return res.status(200).json(await getAllPlanets());
}

module.exports = {
    httpGetAllPlanets,
};