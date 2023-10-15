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
        const populationSelect = screen.getByText("Population");
        expect(populationSelect).toBeInTheDocument();
        const populationDensitySelect = screen.getByText("Population Density");
        expect(populationDensitySelect).toBeInTheDocument();
        const costOfLivingSelect = screen.getByText("Cost of Living");
        expect(costOfLivingSelect).toBeInTheDocument();
        const numberOfJobsAvailableSelect = screen.getByText("Number of Jobs Available");
        expect(numberOfJobsAvailableSelect).toBeInTheDocument();
        const crimeRateSlider = screen.getByText("Crime Rate: 0");
        expect(crimeRateSlider).toBeInTheDocument();
        const walkabilityTransabilitySelect = screen.getByText("Walkability/Transability");
        expect(walkabilityTransabilitySelect).toBeInTheDocument();
        const politicsSelect = screen.getByText("Politics");
        expect(politicsSelect).toBeInTheDocument();
        const qualityOfEducationSelect = screen.getByText("Quality of Education");
        expect(qualityOfEducationSelect).toBeInTheDocument();
        const climateSelect = screen.getByText("Climate");
        expect(climateSelect).toBeInTheDocument();
        const averagePopulationAgeTextInput = screen.getByText("Average Population Age");
        expect(averagePopulationAgeTextInput).toBeInTheDocument();
    });
});