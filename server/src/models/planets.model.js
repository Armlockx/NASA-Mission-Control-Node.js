const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');   //const parse = require('csv-parse'); == error!

const HabitablePlanets = [];

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
        .on('data', (data) => {
            if(isHabitablePlanet(data)){
                HabitablePlanets.push(data); //  Reads the .csv and adds it to the const "HabitablePlanets" on the event "data",
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', () => {
            //console.log(HabitablePlanets);    //Shows all the objects in the array, not pretty.
            console.log(`${HabitablePlanets.length} habitable planets found!`);
            //console.log(HabitablePlanets.map((planet) => {
            //    return planet['kepler_name'];
            //}));
            resolve();
        });
    })
}

//Habitable.map() runs a function that returns just the name of each object in the array 'HabitablePlanets'(in this case).

//module.exports = loadPlanetsData;
//module.exports = HabitablePlanets;

function getAllPlanets(){
    return HabitablePlanets;
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
};
