const citySearch = require("../utils/citySearch.js");
const City = require('../models/City');
const test_cities = require('./test_cities.json'); // Modified set of small cities with specific attributes changed for easy testing results
const small_test_cities = require('./small_test_cities.json');

const basicSearchCriteria = {
    "population":{"min":100421,"max":8336817},
    "populationDensity":"",
    "costOfLiving":"",
    "preferredOccupation":null,
    "crimeRate":"",
    "walkability":"",
    "bikeability":"",
    "politics":"",
    "outdoorScore":"",
    "annualRainfall":null,
    "annualSnowfall":null,
    "priorityAttributes":[],
    "populationAge":{"min":23,"max":47},
    "winterTemp":{"min":16,"max":71},
    "summerTemp":{"min":55,"max":84}
};

describe("Testing citySearch", () => {
    test('low population density', async () => {
        const searchCriteria = {...basicSearchCriteria, populationDensity:0};

        const results = await citySearch(small_test_cities, searchCriteria);

        expect(results[0].name).toBe("Akron");
        expect(results[0].state).toBe("OH");
    })

    test('high population', async () => {
        const searchCriteria = {...basicSearchCriteria, population: {"min":8336817,"max":100000000}};

        const results = await citySearch(small_test_cities, searchCriteria);
        expect(results[0].name).toBe("Albuquerque");
        expect(results[0].state).toBe("NM");
    })

    test('priority attributes', async () => {
        const searchCriteria = {
            ...basicSearchCriteria, 
            walkability: 100, 
            costOfLiving: 0,
            outdoorScore: 100,
            populationAge: 45,
            priorityAttributes: ["walkability", "populationAge"]
        };

        const results = await citySearch(small_test_cities, searchCriteria);
        expect(results[0].name).toBe("Amarillo");
        expect(results[0].state).toBe("TX");
    })

    test('job data', async () => {
        const searchCriteria = {
            ...basicSearchCriteria, 
            costOfLiving: 120,
            preferredOccupation:{"_id":"652dbae131eba7b50da71b60","code":"15-1252.00","title":"Software Developers","description":""},
            priorityAttributes: ["preferredOccupation"]
        };

        const results = await citySearch(test_cities, searchCriteria);

        expect(results[0].name).toBe("Seattle");
        expect(results[0].state).toBe("WA");
    }, 30*1000)

    test('age and temperature ranges', async () => {
        const searchCriteria = {
            ...basicSearchCriteria, 
            "populationAge":{"min":26,"max":31},
            "winterTemp":{"min":36,"max":39},
            "summerTemp":{"min":76,"max":84}
        };

        const results = await citySearch(test_cities, searchCriteria);

        expect(results[0].name).toBe("Fresno");
        expect(results[0].state).toBe("CA");
    })
});