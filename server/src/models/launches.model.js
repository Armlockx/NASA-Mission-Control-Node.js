const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map(); //---> not JSON

//let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration XYZ',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 31, 2099'),
    target: 'Kepler-442 b',
    customers: ['JRX', 'NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

// launches.set(launch.flightNumber, launch);

async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
    .findOne()
    .sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function getAllLaunches(){
    return await launchesDatabase.find({}, {
        '_id': 0, '__v': 0,
    });
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if(!planet) {
        throw new Error('No matching planet found');
    }

    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber, //updates with 'launch' where 'new flightNumber' already exists !!!OR!!! adds a new one
    }, launch, {
        upsert: true,
    });
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Julio Reus X', 'NASA'],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch);
}

/*
function addNewLaunch(launch) {
    latestFlightNumber++;
     launches.set(latestFlightNumber, Object.assign(launch, {
         success: true,
         upcoming: true,
         customers: ['Julio Reus X', 'NASA'],
         flightNumber: latestFlightNumber,
     }));
}
*/

async function abortLaunchById(launchId){
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });
    return aborted.acknowledged === true && aborted.modifiedCount === 1;
    //const aborted = launches.get(launchId);
    //aborted.upcoming = false;
    //aborted.success = false;
    //return aborted;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
};