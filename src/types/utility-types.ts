export type CityPreferencesConfiguration = {
    population: string,
    populationDensity: string,
    costOfLiving: string,
    numberOfJobsAvailable: string,
    crimeRate: number | string,
    walkAndTransability: string,
    politics: string,
    qualityOfEducation: string,
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
    numberOfJobsAvailable: "",
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

