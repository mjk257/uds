const citySearch = require("../utils/citySearch.js")
const City = require('../models/City');
const test_cities = require('./test_cities.json');
const small_test_cities = require('./small_test_cities.json');

describe("Testing citySearch", () => {
    test('low population density', async () => {
        const searchCriteria = {
            "population":{"min":100421,"max":8336817},
            "populationDensity":0,
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
    
        const result = await citySearch(small_test_cities, searchCriteria)
        expect(result[0].name).toBe("Akron")
        expect(result[0].state).toBe("OH")
    })

    test('high population', async () => {
        const searchCriteria = {
            "population":{"min":8336817,"max":100000000},
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

        const result = await citySearch(small_test_cities, searchCriteria)
        expect(result[0].name).toBe("Albuquerque")
        expect(result[0].state).toBe("NM")
    })
});