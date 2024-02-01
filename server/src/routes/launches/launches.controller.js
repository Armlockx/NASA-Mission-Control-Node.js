const { getAllLaunches } = require('../../models/launches.model');    //laucnhes is a Map

//manipulates data from launches that come as Map and turns it into a json object
function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

module.exports = {
    httpGetAllLaunches,
};