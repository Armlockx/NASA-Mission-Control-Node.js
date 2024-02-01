const launches = new Map(); //---> not JSON

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

module.exports = {
    getAllLaunches,
};