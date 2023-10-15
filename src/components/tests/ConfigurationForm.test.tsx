import { render, screen, cleanup } from "@testing-library/react";
import {defaultCityPreferencesConfigurationSet} from "../../types/utility-types";
import ConfigurationForm from "../ConfigurationForm";

afterEach(() => {
    cleanup();
});

describe("Testing ConfigurationList component", () => {

    const mockProps = {
        currentConfig: defaultCityPreferencesConfigurationSet.config1,
        setCurrentConfig: jest.fn(),
        allConfigs: defaultCityPreferencesConfigurationSet,
        currentConfigName: 'config1',
        setAllConfigs: jest.fn(),
        setReturnedCities: jest.fn()
    }

    test("renders ConfigurationList header and configuration buttons", () => {
        render(<ConfigurationForm { ...mockProps } />);

        const configurationFormHeader = screen.getByText("What are you looking for in a city?");
        expect(configurationFormHeader).toBeInTheDocument();
        const populationSelect = screen.getAllByText("Population");
        expect(populationSelect).toHaveLength(2);
        const populationDensitySelect = screen.getAllByText("Population Density");
        expect(populationDensitySelect).toHaveLength(2);
        const costOfLivingSelect = screen.getAllByText("Cost of Living");
        expect(costOfLivingSelect).toHaveLength(2);
        const numberOfJobsAvailableSelect = screen.getAllByText("Number of Jobs Available");
        expect(numberOfJobsAvailableSelect).toHaveLength(2);
        const crimeRateSelect = screen.getAllByText("Crime Rate");
        expect(crimeRateSelect).toHaveLength(2);
        const walkabilityTransabilitySelect = screen.getAllByText("Walkability/Transability");
        expect(walkabilityTransabilitySelect).toHaveLength(2);
        const politicsSelect = screen.getAllByText("Politics");
        expect(politicsSelect).toHaveLength(2);
        const qualityOfEducationSelect = screen.getAllByText("Quality of Education");
        expect(qualityOfEducationSelect).toHaveLength(2);
        const climateSelect = screen.getAllByText("Climate");
        expect(climateSelect).toHaveLength(2);
        const averagePopulationAgeSelect = screen.getAllByText("Average Population Age");
        expect(averagePopulationAgeSelect).toHaveLength(2);
    });
});