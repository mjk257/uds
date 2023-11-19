import { render, screen, cleanup } from "@testing-library/react";
import { defaultCityPreferencesConfigurationSet } from "../../types/utility-types";
import ConfigurationForm from "../ConfigurationForm";

afterEach(() => {
  cleanup();
});

describe("Testing ConfigurationForm component", () => {
  const mockProps = {
    currentConfig: defaultCityPreferencesConfigurationSet.config1,
    setCurrentConfig: jest.fn(),
    allConfigs: defaultCityPreferencesConfigurationSet,
    currentConfigName: "config1",
    setAllConfigs: jest.fn(),
    setReturnedCities: jest.fn(),
  };

  test("renders ConfigurationForm header", () => {
    render(<ConfigurationForm {...mockProps} />);

    const configurationFormHeader = screen.getByText(
        "What Are You Looking For in a City?"
    );
    expect(configurationFormHeader).toBeInTheDocument();
  });

  test("renders ConfigurationForm checkboxes", () => {
    render(<ConfigurationForm {...mockProps} />);

    const lowCostOfLivingRadioGroup = screen.getByText("Low Cost of Living");
    expect(lowCostOfLivingRadioGroup).toBeInTheDocument();
    const lowCrimeRateRadioGroup = screen.getByText("Low Crime Rate");
    expect(lowCrimeRateRadioGroup).toBeInTheDocument();
    const walkability = screen.getByText(
        "High Walkability"
    );
    expect(walkability).toBeInTheDocument();
    const bikeability = screen.getByText(
        "High Bikeability"
    );
    expect(bikeability).toBeInTheDocument();
    const outdoorScoreRadioGroup = screen.getByText("Good for Outdoor Recreation");
    expect(outdoorScoreRadioGroup).toBeInTheDocument();
  });

  test("renders ConfigurationForm sliders", () => {
    render(<ConfigurationForm {...mockProps} />);

    // Tests for sliders
    const population = screen.getByText("Population");
    expect(population).toBeInTheDocument();
    const populationDensity = screen.getByText("Population Density");
    expect(populationDensity).toBeInTheDocument();
    const annualSnowfall = screen.getByText("Annual Snowfall (inches)");
    expect(annualSnowfall).toBeInTheDocument();
    const annualRainfall = screen.getByText("Annual Rainfall (inches)");
    expect(annualRainfall).toBeInTheDocument();
    const avgWinterTemp = screen.getByText("Average Winter Temperature (°F)");
    expect(avgWinterTemp).toBeInTheDocument();
    const avgSummerTemp = screen.getByText("Average Summer Temperature (°F)");
    expect(avgSummerTemp).toBeInTheDocument();
    const averagePopulationAgeSelect = screen.getByText("Average Population Age");
    expect(averagePopulationAgeSelect).toBeInTheDocument();
  });

  test("renders ConfigurationForm select menus", () => {
    render(<ConfigurationForm {...mockProps} />);

    const preferredOccupationSelect = screen.getByText("Preferred Occupation");
    expect(preferredOccupationSelect).toBeInTheDocument();
    const politicsSelect = screen.getByText("Politics");
    expect(politicsSelect).toBeInTheDocument();
  });
});
