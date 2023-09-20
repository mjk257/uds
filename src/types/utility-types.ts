export type CityPreferencesConfiguration = {
    population: string,
    populationDensity: string,
    costOfLiving: string,
    numberOfJobsAvailable: number,
    crimeRate: number,
    walkAndTransability: string,
    politics: string,
    schoolSystems: string,
    climate: string,
    avgPopulationAge: number
};

export const defaultCityPreferencesConfiguration : CityPreferencesConfiguration = {
    population: "",
    populationDensity: "",
    costOfLiving: "",
    numberOfJobsAvailable: 0,
    crimeRate: 0,
    walkAndTransability: "",
    politics: "",
    schoolSystems: "",
    climate: "",
    avgPopulationAge: 0
};

