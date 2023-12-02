const City = require('../models/City');
const axios = require('axios');
require('dotenv').config();
var fs = require('fs');

const api_header = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + process.env.COS_API_KEY
};

// Takes in cities and searchCriteria and returns ranked list of top 10 cities
async function citySearch(cities, searchCriteria) {
    // console.log(JSON.stringify(cities))
    // Main variables for changing how search works
    const valuedScalingFactor = 5;
    let topCities = [];
    const numCoarseResults = 30;
    const numResults = 10; // Number of cities to return
    const cityScores = getCityScores(cities, searchCriteria, valuedScalingFactor); // Get city scores

    // Combine cities and cityScores into an array of tuples
    let combinedData = cities.map((city, index) => [city, cityScores[index]]);

    // Sort the array of tuples by scores in descending order
    combinedData.sort((a, b) => b[1] - a[1]);

    // If jobs is selected, search using it
    if (searchCriteria["preferredOccupation"] != null) {
        await addJobsScores(combinedData, numCoarseResults, searchCriteria, valuedScalingFactor);
    }

    // Compile list of top numResults cities
    for (let i = 0; i < numResults; i++) {
        topCities[i] = combinedData[i][0];
    }

    return topCities;
}

async function addJobsScores(combinedData, numCoarseResults, searchCriteria, valuedScalingFactor) {
    // Compile list of top numCoarseResults cities
    let coarseCityNames = [];
    for (let i = 0; i < numCoarseResults; i++) {
        coarseCityNames[i] = combinedData[i][0].name + "," + combinedData[i][0].state;
    }

    // Get job information
    let jobCode = searchCriteria["preferredOccupation"]["code"];
    let jobCounts = await getJobCounts(coarseCityNames, jobCode);
    let salaries = await getSalaries(coarseCityNames, jobCode);

    // Find min and max job count values
    let jobCountMin = jobCounts[0].job_count;
    let jobCountMax = 0;
    for (let entry of jobCounts) {
        if (entry.job_count < jobCountMin)
            jobCountMin = entry.job_count;
        if (entry.job_count > jobCountMax)
            jobCountMax = entry.job_count;
    }

    // Find min and max salary values
    let salaryMin = salaries[0].hourly;
    let salaryMax = 0;
    for (let entry of salaries) {
        if (entry.hourly < salaryMin)
            salaryMin = entry.hourly;
        if (entry.hourly > salaryMax)
            salaryMax = entry.hourly;
    }

    // Check if variable is prioritized
    let isValued = false;
    if (searchCriteria.priorityAttributes.includes("preferredOccupation"))
        isValued = true;

    // Add new job count values to scores
    let jobCountMaxMinDiff = jobCountMax - jobCountMin;
    let salaryMaxMinDiff = salaryMax - salaryMin;
    for (let i = 0; i < numCoarseResults; i++) {
        let jobCount = jobCounts[i].job_count;
        let salary = null;
        if (salaries[i] != null)
            salary = salaries[i].hourly;

        let jobsScore = (jobCount - jobCountMin) / jobCountMaxMinDiff;
        if (salary != null)
            jobsScore += (salary - salaryMin) / salaryMaxMinDiff;
        jobsScore /= 2;

        if (isValued)
            jobsScore *= valuedScalingFactor;

        combinedData[i][1] += jobsScore;

        let occupation_data = {}
        occupation_data.title = searchCriteria["preferredOccupation"]["title"];
        occupation_data.job_count = jobCount;
        occupation_data.hourly_salary = salary;
        combinedData[i][0].occupation_data = occupation_data;
    }

    // Sort the array of tuples by scores in descending order
    combinedData.sort((a, b) => b[1] - a[1]);
}

function getAttributeValue(city, criteriaName) {
    //TODO: implement "return null" cases once that data becomes available in database
    // Get city attribute value from criteria name
    switch (criteriaName) {
        case "costOfLiving":
            return city.rpp;
        case "crimeRate":
            return city.crime_rate;
        case "walkability":
            return city.walkscore;
        case "bikeability":
            return city.bikescore;
        case "outdoorScore":
            return city.outdoor_score;
        case "population":
            return city.population;
        case "populationDensity":
            return city.density;
        case "climate":
            return city.zone_description;
        case "politics":
            return city.partisan_lean;
        case "populationAge":
            return city.median_age;
        case "annualRainfall":
            return city.annual_precipitation;
        case "annualSnowfall":
            return city.annual_snow;
        case "summerTemp":
            return city.summer_temp;
        case "winterTemp":
            return city.winter_temp;
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

        for (let city of cities) {
            let attrributeValue = getAttributeValue(city, criteriaName);
            if (typeof(attrributeValue) != 'number') {
                continue;
            }

            if (attrributeValue < min)
                min = attrributeValue;
            if (attrributeValue > max)
                max = attrributeValue;
        }

        if (min == Number.MIN_VALUE)
            min = null;
        if (max == Number.MAX_VALUE)
            max = null;

        normalizationData[criteriaName] = [min, max]
    }

    return normalizationData;
}

function getNormalizedCityValue(cityValue, pref, normalizedPref, criteriaMin, criteriaMaxMinDiff, isValued, valuedScalingFactor) {
    
    if (criteriaMin != null) { // If numbered attribute
        if (criteriaMaxMinDiff == 0) // Avoid division by zero
            return null;

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

    return cityValue;
}

function getCityScores(cities, searchCriteria, valuedScalingFactor) {
    // cities is a list of City objects
    // searchCriteria is a JSON with keys=criteriaName and values=preferenceValue and one of keys="priorityAttributes", value=[list of criteriaName that were marked as important]
    let cityScores = Array(cities.length).fill(0);
    let rangeScalingFactor = 10;

    // Get normalizing data (min and max of each criteria)
    let normalizeData = getNormalizationData(cities, searchCriteria);

    // Get city scores
    for (let criteriaName in searchCriteria) {
        if (criteriaName == "priorityAttributes")
            continue;

        let pref = searchCriteria[criteriaName];

        if (criteriaName == "preferredOccupation")
            continue;

        let rangeMin = null;
        let rangeMax = null;

        if (typeof(pref) == "object") {
            if(pref != null && pref["min"] != null) {
                rangeMin = pref["min"];
                rangeMax = pref["max"];
                pref = (rangeMax + rangeMin) / 2;
            } else {
                continue;
            }
        }

        if ((typeof(pref) == "string" && pref == "") || pref == null) //If no preference then ignore the attribute
            continue;

        if (criteriaName == "politics") // Adjust preferences to numerical for politics preference
            pref = (pref == "republican") ? -100 : 100

        let isValued = searchCriteria.priorityAttributes.includes(criteriaName); // Check if criteria is in list of importance

        // Get min/max values for criteria for normalization
        let criteriaMin = normalizeData[criteriaName][0];
        let criteriaMaxMinDiff = null;
        let normalizedPref = null;

        if (criteriaMin != null) {
            if (pref == "max") {
                normalizedPref = 1;
            } else if (pref == "min") {
                normalizedPref = 0;
            } else {
                criteriaMaxMinDiff = normalizeData[criteriaName][1] - criteriaMin; // max - min
                normalizedPref = (pref - criteriaMin) / criteriaMaxMinDiff;
                // console.log("Min: " + criteriaMin + ", Max: " + normalizeData[criteriaName][1] + ", MaxMinDiff: " + criteriaMaxMinDiff + ", pref: " + pref + ", normalizedPref: " + normalizedPref);
            
                // If preference is outside range of data
                if (normalizedPref < 0)
                    normalizedPref = 0;
                else if(normalizedPref > 1)
                    normalizedPref = 1;
            }
        }

        // Add city criteria score to each cities score
        for (let i = 0; i < cities.length; i++) {
            let city = cities[i];
            let cityValue = getAttributeValue(city, criteriaName);

            if (cityValue == null) // If attribute not in database (either in total or for the specific city)
                continue;

            if (rangeMin != null && cityValue >= rangeMin && cityValue <= rangeMax) {
                cityValue = isValued ? rangeScalingFactor * valuedScalingFactor : rangeScalingFactor;
            } else {
                cityValue = getNormalizedCityValue(cityValue, pref, normalizedPref, criteriaMin, criteriaMaxMinDiff, isValued, valuedScalingFactor);
            }

            if (cityValue == null)
                break;

            // Add criteria score to city score sum
            cityScores[i] += cityValue;
        }
    }

    // Return list of all city scores, the higher the score the better the fit
    return cityScores;
}

async function getJobCounts(cities, job_code){

    const params = {
        "source": "NLx",
        "showFilters": "false"
    };

    const return_data = [];
    for (const city of cities) {
        const api_url = "https://api.careeronestop.org/v1/jobsearch/" + process.env.COS_USER_ID + "/" + job_code + "/" + formatCity(city) + "/25/0/0/0/1/60";
        const res = await axios({
            method: 'get',
            url: api_url,
            params: params,
            headers: api_header
        });
        return_data.push({"job_count": parseInt(res.data.Jobcount), "city": city});

    };
        
    return return_data;
}

async function getSalaries(cities, job_code){
    // Partition the array into arrays of 5 for API calls
    const cityGroups = cities.reduce((resultArray, item, index) => { 
        const chunkIndex = Math.floor(index/5)
      
        if(!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []
        }
      
        resultArray[chunkIndex].push(item)
      
        return resultArray
      }, []);

    const return_data = [];
    for (const cityGroup of cityGroups){
        const params = {
            "keyword": job_code,
            "location": cityGroup.join(" | "),
            "sortColumns": 0,
            "sortOrder": 0,
            "sortBy": 0,
            "enableMetaData": "true"
        };
        const api_url = "https://api.careeronestop.org/v1/comparesalaries/" + process.env.COS_USER_ID + "/wageocc/";
        const res = await axios({
            method: 'get',
            url: api_url,
            params: params,
            headers: api_header
        });
        for (const city of res.data.LocationsList){
            try {
                return_data.push({"hourly": Number.parseFloat(city.OccupationList[0].WageInfo[0].Median), "city": city.InputLocation});
            } catch {
                return_data.push({"hourly": null, "city": city.InputLocation});
                console.log("Couldn't get median pay for", city.InputLocation);
            }
        };
    }

    return return_data;    
}

function formatCity(city){
    let new_city1 = city.replace(" ", "%20");
    let new_city2 = new_city1.replace(",", "%2C");
    return new_city2;
}


module.exports = citySearch;
