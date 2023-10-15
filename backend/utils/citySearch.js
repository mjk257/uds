const City = require('../models/City');

// Takes in cities and searchCriteria and returns ranked list of top 10 cities
function citySearch(cities, searchCriteria) {
    const numResults = 10; // Number of cities to return
    cityScores = getCityScores(cities, searchCriteria); // Get city scores

    // Combine cities and cityScores into an array of tuples
    const combinedData = cities.map((city, index) => [city, cityScores[index]]);

    // Sort the array of tuples by scores in descending order
    combinedData.sort((a, b) => b[1] - a[1]);

    //console.log(combinedData);

    for (let i = 0; i < numResults; i++) {
        topCities[i+1] = combinedData[i][0]
    }

    return topCities;
}

function getAttributeValue(city, criteriaName) {
    // Get city attribute value from criteria name
    switch (criteriaName) {
        case "density":
            return parseFloat(city.density);
        case "col":
            return city.rpp;
        default:
            return null;
    }
}

function getCityScores(cities, searchCriteria) {
    // cities is a list of City objects
    // searchCriteria is a JSON with (prefs: a dictionary with keys=criteriaName and values=preferenceValue) and (valued: list of criteriaName that were marked as important)
    valuedScalingFactor = 10;
    num_cities = cities.length;
    let cityScores = Array(num_cities).fill(0);

    // const searchCriteria = JSON.parse(JSON.stringify(searchCriteriaJSON));

    // Get normalizing data
    let normalizeData = {}
    // For each criteria, get min, max, and average?
    for (let criteriaName in searchCriteria.prefs) {
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;

        for (let i = 0; i < num_cities; i++) {
            attrributeValue = getAttributeValue(cities[i], criteriaName);

            if (attrributeValue < min)
                min = attrributeValue;
            if (attrributeValue > max)
                max = attrributeValue;
        }
        normalizeData[criteriaName] = [min, max]
    }

    // Get city scores
    for (let criteriaName in searchCriteria.prefs) {
        let pref = searchCriteria.prefs[criteriaName];
        let isValued = searchCriteria.valued.includes(criteriaName); // Check if criteria is in list of importance

        // console.log("criteria: " + criteriaName + ", pref: " + pref + ", isValued: " + isValued)
        let criteriaMin = normalizeData[criteriaName][0];
        let criteriaMaxMinDiff = normalizeData[criteriaName][1] - criteriaMin; // max - min
        let normalizedPref = (pref - criteriaMin) / criteriaMaxMinDiff;
        // console.log("Min: " + criteriaMin + ", Max: " + normalizeData[criteriaName][1] + ", MaxMinDiff: " + criteriaMaxMinDiff + ", pref: " + pref + ", normalizedPref: " + normalizedPref);
        
        // If preference is outside range of data
        if (normalizedPref < 0)
            normalizedPref = 0;
        else if(normalizedPref > 1)
            normalizedPref = 1;

        for (let i = 0; i < cities.length; i++) {
            let city = cities[i];
            let cityValue = getAttributeValue(city, criteriaName);
            if (cityValue == null)
                break;

            // Normalize (applicable) attributes to 0.0 - 1.0 using linear scaling: (val - min) / (max - min)
            cityValue = (cityValue - criteriaMin) / criteriaMaxMinDiff

            // Tune ratings to preferences (and for discrete vars, create them)
            // Values will still be in 0.0 to 1.0 range with 1.0 being the best
            // console.log("val = " + getAttributeValue(city, criteriaName) + ", normalized val = " + cityValue + ", abs = " + Math.abs(cityValue - normalizedPref) + ", ");
            let inverseNormalizedPref = 1 / Math.max(normalizedPref, 1 - normalizedPref);

            cityValue = -Math.abs(cityValue - normalizedPref) * inverseNormalizedPref + 1;
            // console.log("val = " + getAttributeValue(city, criteriaName) + ", normalized to pref val = " + cityValue);

            // If one of important attributes, multiply by scaling factor
            if (isValued)
                cityValue *= valuedScalingFactor;

            // Add criteria score to city score sum
            // console.log(cityValue);
            cityScores[i] += cityValue;
        }
    }
    // Return top 10 cities with highest score and a "rank" attribute 1-10
    return cityScores;
}


module.exports = citySearch;