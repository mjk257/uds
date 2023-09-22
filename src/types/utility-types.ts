export type CityPreferencesConfiguration = {
    population: string,
    populationDensity: string,
    costOfLiving: string,
    numberOfJobsAvailable: number,
    crimeRate: number,
    walkAndTransability: string,
    politics: string,
    qualityOfEducation: string,
    climate: string,
    avgPopulationAge: number
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
    numberOfJobsAvailable: 0,
    crimeRate: 0,
    walkAndTransability: "",
    politics: "",
    qualityOfEducation: "",
    climate: "",
    avgPopulationAge: 0
};

export const defaultCityPreferencesConfigurationSet : Configs = {
    "config1": {
        population: "",
        populationDensity: "",
        costOfLiving: "",
        numberOfJobsAvailable: 0,
        crimeRate: 0,
        walkAndTransability: "",
        politics: "",
        qualityOfEducation: "",
        climate: "",
        avgPopulationAge: 0
    },
    "config2": {
        population: "",
        populationDensity: "",
        costOfLiving: "",
        numberOfJobsAvailable: 0,
        crimeRate: 0,
        walkAndTransability: "",
        politics: "",
        qualityOfEducation: "",
        climate: "",
        avgPopulationAge: 0
    },
    "config3": {
        population: "",
        populationDensity: "",
        costOfLiving: "",
        numberOfJobsAvailable: 0,
        crimeRate: 0,
        walkAndTransability: "",
        politics: "",
        qualityOfEducation: "",
        climate: "",
        avgPopulationAge: 0
    },
    "config4": {
        population: "",
        populationDensity: "",
        costOfLiving: "",
        numberOfJobsAvailable: 0,
        crimeRate: 0,
        walkAndTransability: "",
        politics: "",
        qualityOfEducation: "",
        climate: "",
        avgPopulationAge: 0
    },
    "config5": {
        population: "",
        populationDensity: "",
        costOfLiving: "",
        numberOfJobsAvailable: 0,
        crimeRate: 0,
        walkAndTransability: "",
        politics: "",
        qualityOfEducation: "",
        climate: "",
        avgPopulationAge: 0
    }
};

