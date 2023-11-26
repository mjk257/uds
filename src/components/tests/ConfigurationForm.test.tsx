import { render, screen, cleanup } from "@testing-library/react";
import {defaultCityPreferencesConfigurationSet, Occupation} from "../../types/utility-types";
import ConfigurationForm from "../ConfigurationForm";

const mockRanges = {
  avg_age: 34.68817891373802,
  avg_density: 4200.251592356688,
  avg_population: 303060.7006369427,
  avg_rain: 37.047770700636946,
  avg_snow: 18.162420382165607,
  avg_summer_temp: 76.2484076433121,
  avg_winter_temp: 39.49044585987261,
  max_age: 47,
  max_density: 27754,
  max_population: 8336817,
  max_rain: 60,
  max_snow: 119,
  max_summer_temp: 84,
  max_winter_temp: 71,
  min_age: 22.9,
  min_density: 168,
  min_population: 100421,
  min_rain: 20,
  min_snow: 0,
  min_summer_temp: 55,
  min_winter_temp: 16,
  _id: null
}

const mockOccupations = [{} as Occupation];

describe("Testing ConfigurationForm component", () => {
  const mockProps = {
    currentConfig: defaultCityPreferencesConfigurationSet.config1,
    setCurrentConfig: jest.fn(),
    allConfigs: defaultCityPreferencesConfigurationSet,
    currentConfigName: "config1",
    setAllConfigs: jest.fn(),
    setReturnedCities: jest.fn(),
    allOccupations: mockOccupations,
    allRanges: mockRanges
  };

  beforeEach(() => {
    jest.mock("../../util/api-calls", () => {
      return {
        getRanges: jest.fn().mockImplementation(async () => Promise.resolve(mockRanges)),
        getAllOccupations: jest.fn().mockImplementation(async () => Promise.resolve(mockOccupations))
      };
    });
  });

  afterEach(() => {
    cleanup();
  });

  test("renders ConfigurationForm header and initial helper text", () => {
    render(<ConfigurationForm {...mockProps} />);

    const configurationFormHeader = screen.getByText("What Are You Looking For in a City?");
    expect(configurationFormHeader).toBeInTheDocument();
    const configurationFormHelperText = screen.getByText("Fill in any criteria that you want and star up to three that are very important to you.");
    expect(configurationFormHelperText).toBeInTheDocument();
  });

  test("renders Traits section", () => {
    render(<ConfigurationForm {...mockProps} />);

    const traitsHeader = screen.getByText("Traits");
    expect(traitsHeader).toBeInTheDocument();
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

  test("renders Population Stats section", () => {
    render(<ConfigurationForm {...mockProps} />);

    const populationStatsHeader = screen.getByText("Population Stats");
    expect(populationStatsHeader).toBeInTheDocument();
    const population = screen.getByText("Population");
    expect(population).toBeInTheDocument();
    const averagePopulationAgeSelect = screen.getByText("Average Population Age");
    expect(averagePopulationAgeSelect).toBeInTheDocument();
    const populationDensity = screen.getByText("Population Density");
    expect(populationDensity).toBeInTheDocument();
  });

  test("renders Climate section", () => {
    render(<ConfigurationForm {...mockProps} />);

    const climateHeader = screen.getByText("Climate");
    expect(climateHeader).toBeInTheDocument();
    const avgWinterTemp = screen.getByText("Average Winter Temperature (°F)");
    expect(avgWinterTemp).toBeInTheDocument();
    const avgSummerTemp = screen.getByText("Average Summer Temperature (°F)");
    expect(avgSummerTemp).toBeInTheDocument();
    const annualSnowfall = screen.getByText("Annual Snowfall");
    expect(annualSnowfall).toBeInTheDocument();
    const annualRainfall = screen.getByText("Annual Rainfall");
    expect(annualRainfall).toBeInTheDocument();
  });

  test("renders Career section", () => {
    render(<ConfigurationForm {...mockProps} />);

    const careerHeader = screen.getByText("Career");
    expect(careerHeader).toBeInTheDocument();
    const preferredOccupationSelect = screen.getByText("Preferred Occupation");
    expect(preferredOccupationSelect).toBeInTheDocument();
    const politics = screen.getByText("Politics");
    expect(politics).toBeInTheDocument();
  });
});
