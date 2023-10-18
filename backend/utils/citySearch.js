const City = require('../models/City');
const axios = require('axios');
require('dotenv').config();

// Takes in cities and searchCriteria and returns ranked list of top 10 cities
function citySearch(cities, searchCriteria) {
    let topCities = [];
    const numResults = 10; // Number of cities to return
    cityScores = getCityScores(cities, searchCriteria); // Get city scores

    // Combine cities and cityScores into an array of tuples
    const combinedData = cities.map((city, index) => [city, cityScores[index]]);

    // Sort the array of tuples by scores in descending order
    combinedData.sort((a, b) => b[1] - a[1]);

    // Compile list of top numResults cities
    for (let i = 0; i < numResults; i++) {
        topCities[i] = combinedData[i][0];
    }

    return topCities;
}

function getAttributeValue(city, criteriaName) {
    //TODO: implement "return null" cases once that data becomes available in database
    // Get city attribute value from criteria name
    switch (criteriaName) {
        case "costOfLiving":
            return city.rpp;
        case "crimeRate":
            return null;
        case "walkAndTransability":
            return null;
        case "qualityOfEducation":
            return null;
        case "population":
            return city.population;
        case "populationDensity":
            return city.density;
        case "climate":
            return city.zone_description; //TODO: Parse this data correctly to match input data
        case "preferredOccupation":
            return null;
        case "politics":
            return city.partisan_lean;
        case "avgPopulationAge":
            return null;
        default:
            return null;
    }
}

function getNormalizationData(cities, searchCriteria) {
    let normalizationData = {}
    // For each Number criteria, get min and max
    for (let criteriaName in searchCriteria) {
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;

        for (let i = 0; i < cities.length; i++) {
            attrributeValue = getAttributeValue(cities[i], criteriaName);
            if (typeof(attrributeValue) != 'number') {
                min = null;
                max = null;
                break;
            }


            if (attrributeValue < min)
                min = attrributeValue;
            if (attrributeValue > max)
                max = attrributeValue;
        }
        normalizationData[criteriaName] = [min, max]
    }

    return normalizationData;
}

function getCityScores(cities, searchCriteria) {
    // cities is a list of City objects
    // searchCriteria is a JSON with keys=criteriaName and values=preferenceValue and one of keys="priorityAttributes", value=[list of criteriaName that were marked as important]
    const valuedScalingFactor = 5;
    let cityScores = Array(cities.length).fill(0);

    // Get normalizing data (min and max of each criteria)
    let normalizeData = getNormalizationData(cities, searchCriteria);

    // Get city scores
    for (let criteriaName in searchCriteria) {
        if (criteriaName == "priorityAttributes")
            continue;

        let pref = searchCriteria[criteriaName];

        if (typeof(pref) == "string" && pref == "") //If no preference then ignore the attribute
            continue;

        if (criteriaName == "politics") // Adjust preferences to numerical for politics preference
            pref = (pref == "republican") ? -100 : 100

        let isValued = searchCriteria.priorityAttributes.includes(criteriaName); // Check if criteria is in list of importance

        // Get min/max values for criteria for normalization
        let criteriaMin = normalizeData[criteriaName][0];
        let criteriaMaxMinDiff = null;
        let normalizedPref = null;

        if (criteriaMin != null) {
            criteriaMaxMinDiff = normalizeData[criteriaName][1] - criteriaMin; // max - min
            normalizedPref = (pref - criteriaMin) / criteriaMaxMinDiff;
            // console.log("Min: " + criteriaMin + ", Max: " + normalizeData[criteriaName][1] + ", MaxMinDiff: " + criteriaMaxMinDiff + ", pref: " + pref + ", normalizedPref: " + normalizedPref);
        
            // If preference is outside range of data
            if (normalizedPref < 0)
                normalizedPref = 0;
            else if(normalizedPref > 1)
                normalizedPref = 1;
        }

        // Add city criteria score to each cities score
        for (let i = 0; i < cities.length; i++) {
            let city = cities[i];
            let cityValue = getAttributeValue(city, criteriaName);

            if (cityValue == null) // If attribute not in database (either in total or for the specific city)
                continue;

            if (criteriaMin != null) { // If numbered attribute
                if (criteriaMaxMinDiff == 0) // Avoid division by zero
                    break;

                // Normalize (applicable) attributes to 0.0 - 1.0 using linear scaling: (val - min) / (max - min)
                cityValue = (cityValue - criteriaMin) / criteriaMaxMinDiff

                // Tune ratings to preferences
                // Values will still be in 0.0 to 1.0 range with 1.0 being the best
                let inverseNormalizedPref = 1 / Math.max(normalizedPref, 1 - normalizedPref);
                cityValue = -Math.abs(cityValue - normalizedPref) * inverseNormalizedPref + 1;
            } else {
                cityValue = (cityValue == pref) ? 1 : 0;
            }

            // If one of important attributes, multiply by scaling factor
            if (isValued)
                cityValue *= valuedScalingFactor;

            // Add criteria score to city score sum
            cityScores[i] += cityValue;
        }
    }

    // Return list of all city scores, the higher the score the better the fit
    return cityScores;
}

function getJobCounts(cities, job_code){
    const api_header = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + proccess.env.COS_API_KEY
    };
    const params = {
        "source": "NLx",
        "showFilters": "false"
    };

    const return_data = [];
    cities.forEach(async (city) => {
        const api_url = "https://api.careeronestop.org/v1/jobsearch/" + proccess.env.COS_USER_ID + "/" + job_code + "/" + formatCity(city) + "/25/0/0/0/1/60";
        const res = await axios({
            method: 'get',
            url: api_url,
            params: params,
            headers: api_header
        });
        const data = res.json();
        return_data.append({"job_count": data.pop("Jobcount"), "city": city});
    });
        
    return return_data;
}

function formatCity(city){
    let new_city = city.replace(" ", "%20");
    new_city = city.replace(",", "%2C");
    return new_city;
}


module.exports = citySearch;