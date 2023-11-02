import { render, screen, cleanup } from "@testing-library/react";
import { defaultCityPreferencesConfigurationSet } from "../../types/utility-types";
import ConfigurationForm from "../ConfigurationForm";

afterEach(() => {
  cleanup();
});

describe("Testing ConfigurationList component", () => {
  const mockProps = {
    currentConfig: defaultCityPreferencesConfigurationSet.config1,
    setCurrentConfig: jest.fn(),
    allConfigs: defaultCityPreferencesConfigurationSet,
    currentConfigName: "config1",
    setAllConfigs: jest.fn(),
    setReturnedCities: jest.fn(),
  };

  test("renders ConfigurationList header and configuration buttons", () => {
    render(<ConfigurationForm {...mockProps} />);

    const configurationFormHeader = screen.getByText(
      "What are you looking for in a city?"
    );
    expect(configurationFormHeader).toBeInTheDocument();

    // Tests for radio button groups
    const lowCostOfLivingRadioGroup = screen.getByText("Low Cost of Living?");
    expect(lowCostOfLivingRadioGroup).toBeInTheDocument();
    const lowCrimeRateRadioGroup = screen.getByText("Low Crime Rate?");
    expect(lowCrimeRateRadioGroup).toBeInTheDocument();
    const highWalkabilityTransabilityRadioGroup = screen.getByText(
      "High Walkability/Transability?"
    );
    expect(highWalkabilityTransabilityRadioGroup).toBeInTheDocument();
    const outdoorScoreRadioGroup = screen.getByText("Good for Outdoor Recreation?");
    expect(outdoorScoreRadioGroup).toBeInTheDocument();

    // Tests for selects
    const populationSelect = screen.getAllByText("Population");
    expect(populationSelect).toHaveLength(2);
    const populationDensitySelect = screen.getAllByText("Population Density");
    expect(populationDensitySelect).toHaveLength(2);
    const preferredOccupationSelect = screen.getAllByText(
      "Preferred Occupation"
    );
    expect(preferredOccupationSelect).toHaveLength(2);
    const politicsSelect = screen.getAllByText("Politics");
    expect(politicsSelect).toHaveLength(2);
    const climateSelect = screen.getAllByText("Climate");
    expect(climateSelect).toHaveLength(2);
    const averagePopulationAgeSelect = screen.getAllByText(
      "Average Population Age"
    );
    expect(averagePopulationAgeSelect).toHaveLength(2);

    // Tests for specific checkbox values for radio button groups
    const costOfLivingCheckbox = screen.getByText("Cost of Living");
    expect(costOfLivingCheckbox).toBeInTheDocument();
    const crimeRateCheckbox = screen.getByText("Crime Rate");
    expect(crimeRateCheckbox).toBeInTheDocument();
    const walkabilityTransabilityCheckbox = screen.getByText(
      "Walkability/Transability"
    );
    expect(walkabilityTransabilityCheckbox).toBeInTheDocument();
    const outdoorScoreCheckbox = screen.getByText("Good for Outdoor Recreation");
    expect(outdoorScoreCheckbox).toBeInTheDocument();
  });
});
