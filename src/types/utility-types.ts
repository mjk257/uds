import{ getRanges } from "../util/api-calls";
import { Ranges } from "./Ranges";
let ranges = {} as Ranges;
await getRanges().then((resp) => {
    ranges = resp;
});
export const populationRange = [ranges.min_population, ranges.max_population, ranges.avg_population];
export const ageRange = [ranges.min_age, ranges.max_age, ranges.avg_age];
export const densityRange = [ranges.min_density, ranges.max_density, ranges.avg_density];
export const annualSnowfallRange = [ranges.min_snow, ranges.max_snow, ranges.avg_snow];
export const annualRainfallRange = [ranges.min_rain, ranges.max_rain, ranges.avg_rain];
export const avgWinterTempRange = [ranges.min_winter_temp, ranges.max_winter_temp, ranges.avg_winter_temp];
export const avgSummerTempRange = [ranges.min_summer_temp, ranges.max_summer_temp, ranges.avg_summer_temp];

export const numTics = 10;

export type CityPreferencesConfiguration = {
    population: string | number[],
    populationDensity: string | number[],
    costOfLiving: string | number,
    preferredOccupation: Occupation | null,
    crimeRate: number | string,
    walkability: string | number,
    bikeability: string | number,
    politics: string,
    outdoorScore: string | number,
    annualRainfall: number[],
    annualSnowfall: number[],
    avgWinterTemp: string | number[],
    avgSummerTemp: string | number[],
    avgPopulationAge: number[] | string
    priorityAttributes: string[]
};

export type Configs = {
    "config1": CityPreferencesConfiguration,
    "config2": CityPreferencesConfiguration,
    "config3": CityPreferencesConfiguration,
    "config4": CityPreferencesConfiguration,
    "config5": CityPreferencesConfiguration
}

export const defaultCityPreferencesConfiguration : CityPreferencesConfiguration =  {
    population: [0, 10],
    populationDensity: "",
    costOfLiving: "",
    preferredOccupation: null,
    crimeRate: '',
    walkability: "",
    bikeability: "",
    politics: "",
    outdoorScore: "",
    annualRainfall: [],
    annualSnowfall: [],
    avgWinterTemp: [0, 10],
    avgSummerTemp: [0, 10],
    avgPopulationAge: [0, 10],
    priorityAttributes: []
};

export const defaultCityPreferencesConfigurationSet : Configs = {
    "config1": defaultCityPreferencesConfiguration,
    "config2": defaultCityPreferencesConfiguration,
    "config3": defaultCityPreferencesConfiguration,
    "config4": defaultCityPreferencesConfiguration,
    "config5": defaultCityPreferencesConfiguration
};

export type CityDetails = {
    density: number,
    population: number,
    name: string,
    state: string,
    longitude: number,
    latitude: number,
    rpp: number,
    climate_zone: string,
    zone_description: string,
    partisan_lean: number // negative value is more republican, positive is more democratic
    outdoor_score: number // the closer this value is to 100, the better suited the city is for outdoor recreation
    occupation_data: number,
    median_age: number,
    annual_precipitation: number,
    annual_snowfall: number,
    winter_temp: number,
    summer_temp: number,
    crime_rate: number,
    walkscore: number,
    bikescore: number
}

export type Occupation = {
    title: string,
    code: number,
    description: string
}

export type CityResponse = {
    [key: string]: CityDetails
}

