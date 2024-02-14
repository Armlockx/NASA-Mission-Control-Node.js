const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');   //const parse = require('csv-parse'); == error!

const planets = require('./planets.mongo');

//const HabitablePlanets = [];

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise ((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',       //uses the 'parse' object to format the csv to a
            columns: true,      //readable way for nodejs to work with
        }))
        .on('data', async (data) => {
            if(isHabitablePlanet(data)){
                await savePlanet(data);
                // HabitablePlanets.push(data);
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', async () => {
            const countPlanetsFound = (await getAllPlanets()).length;
            console.log(`${countPlanetsFound} habitable planets found!`);
            resolve();
            //console.log(`${HabitablePlanets.length} habitable planets found!`);
            //console.log(HabitablePlanets);    //Shows all the objects in the array, not pretty.
            //console.log(HabitablePlanets.map((planet) => { return planet['kepler_name']; }));
        });
    })
}

async function getAllPlanets(){
    //return HabitablePlanets;
    //console.log(await planets.find({}));
    return await planets.find({} , {
        '_id': 0, '__v': 0,
    });
}

async function savePlanet(planet) {
    // insert + update = upsert => MONGOOSE
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true,
        });
    } catch(err) {
        console.log(`Could not save planet: ${err}`)
    }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
};
