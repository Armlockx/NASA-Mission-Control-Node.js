const launches = new Map(); //---> not JSON

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration XYZ',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 31, 2099'),
    destination: 'Kepler-442 b',
    customer: ['JRX', 'NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches(){
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
     launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customer: ['Julio Reus X', 'NASA'],
        upcoming: true,
        success: true,
     }));
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
};