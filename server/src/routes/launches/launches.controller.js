const { 
    getAllLaunches,
    scheduleNewLaunch ,
    existsLaunchWithId,
    abortLaunchById,
} = require('../../models/launches.model');    //laucnhes is a Map

//manipulates data from launches that come as Map and turns it into a json object
async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target ) {
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

    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);    //201 = created
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    if(!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: 'Launch not found',
        });
    }
    
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
};