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
    partisan_lean: number, // negative value is more republican, positive is more democratic
    outdoor_score: number, // the closer this value is to 100, the better suited the city is for outdoor recreation
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

export type Ranges = {
    "_id": null,
    "max_population": number,
    "min_population": number,
    "avg_population": number,
    "max_density": number,
    "min_density": number,
    "avg_density": number,
    "max_age": number,
    "min_age": number,
    "avg_age": number,
    "max_summer_temp": number,
    "min_summer_temp": number,
    "avg_summer_temp": number,
    "max_winter_temp": number,
    "min_winter_temp": number,
    "avg_winter_temp": number,
    "max_rain": number,
    "min_rain": number,
    "avg_rain": number,
    "max_snow": number,
    "min_snow": number,
    "avg_snow": number
}

