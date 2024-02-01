const { 
    getAllLaunches,
    addNewLaunch 
} = require('../../models/launches.model');    //laucnhes is a Map

//manipulates data from launches that come as Map and turns it into a json object
function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination ) {
        return res.status(400).json({
            error: 'Missing required launch property.',
        });
    }
    
    launch.launchDate = new Date(launch.launchDate);
    //if (launch.launchDate.toString() === 'Invalid Date'){
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date inserted.',
        });
    }

    addNewLaunch(launch);
    return res.status(201).json(launch);    //201 = created
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch
};