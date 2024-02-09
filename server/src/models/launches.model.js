const launches = new Map(); //---> not JSON

let latestFlightNumber = 100;

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

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

function getAllLaunches(){
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
     launches.set(latestFlightNumber, Object.assign(launch, {
         success: true,
         upcoming: true,
         customers: ['Julio Reus X', 'NASA'],
         flightNumber: latestFlightNumber,
     }));
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
};