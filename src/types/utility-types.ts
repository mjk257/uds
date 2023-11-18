// Later on, this will be obtained from an endpoint
export const populationRange = [100000, 9000000];
export const ageRange = [20, 100];
export const densityRange = [100, 31000];
export const annualSnowfallRange = [0, 120];
export const annualRainfallRange = [20, 60];
export const avgWinterTempRange = [15, 75];
export const avgSummerTempRange = [55, 85];

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
    annualRainfall: string | number[],
    annualSnowfall: string | number[],
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
    population: populationRange,
    populationDensity: densityRange,
    costOfLiving: "",
    preferredOccupation: null,
    crimeRate: '',
    walkability: "",
    bikeability: "",
    politics: "",
    outdoorScore: "",
    annualRainfall: annualRainfallRange,
    annualSnowfall: annualSnowfallRange,
    avgWinterTemp: avgWinterTempRange,
    avgSummerTemp: avgSummerTempRange,
    avgPopulationAge: ageRange,
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

