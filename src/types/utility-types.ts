export type CityPreferencesConfiguration = {
    population: string | number,
    populationDensity: string | number,
    costOfLiving: string | number,
    preferredOccupation: Occupation | null,
    crimeRate: number | string,
    walkAndTransability: string | number,
    politics: string,
    outdoorScore: string | number,
    climate: string,
    avgPopulationAge: number | string
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
    population: "",
    populationDensity: "",
    costOfLiving: "",
    preferredOccupation: null,
    crimeRate: '',
    walkAndTransability: "",
    politics: "",
    outdoorScore: "",
    climate: "",
    avgPopulationAge: '',
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
    median_age: number
}

export type Occupation = {
    title: string,
    code: number,
    description: string
}

export type CityResponse = {
    [key: string]: CityDetails
}

