export type CityPreferencesConfiguration = {
    population: string | number,
    populationDensity: string | number,
    costOfLiving: string | number,
    preferredOccupation: Occupation | null,
    crimeRate: number | string,
    walkAndTransability: string | number,
    politics: string,
    qualityOfEducation: string | number,
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
    qualityOfEducation: "",
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
    partisan_lean: number //negative value is more republican, positive is more democratic
}

export type Occupation = {
    title: string,
    code: number,
    description: string
}

export type CityResponse = {
    [key: string]: CityDetails
}

