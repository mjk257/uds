import { render, screen, cleanup } from "@testing-library/react";
import CityResponseCard from "../CityResponseCard";
import { CityDetails } from "../../types/utility-types";

const nycSummary =
  "New York City is a city in the United States. " +
  "It is the largest city in the United States. " +
  "It is also the most populous city in the United States. " +
  "It is also the most densely populated city in the United States. " +
  "It is also the most expensive city in the United States. " +
  "It is also the most dangerous city in the United States. " +
  "It is also the most walkable city in the United States. " +
  "It is also the most democratic city in the United States. " +
  "It is also the most educated city in the United States. " +
  "It is also the most humid-subtropical city in the United States. " +
  "It is also the youngest city in the United States.";

const mockCityDetails: CityDetails = {
  density: 1,
  population: 1,
  name: "New York City",
  state: "NY",
  longitude: 1,
  latitude: 1,
  rpp: 1,
  climate_zone: "humid-subtropical",
  zone_description: nycSummary,
  partisan_lean: 1,
  outdoor_score: 1,
  occupation_data: 1,
  median_age: 1,
  annual_precipitation: 1,
  annual_snowfall: 1,
  winter_temp: 1,
  summer_temp: 1,
  crime_rate: 1,
  walkscore: 1,
  bikescore: 1,
};

describe("Testing CityResponseCard component", () => {
  const mockProps = {
    cityDetails: mockCityDetails,
    rank: 1,
    handleClose: jest.fn(),
    isMarkerClicked: false,
  };

  afterEach(() => {
    cleanup();
  });

  test("renders header and description", () => {
    render(<CityResponseCard {...mockProps} />);

    const cityName = screen.getByText("1.) New York City, NY");
    expect(cityName).toBeInTheDocument();
    const citySummary = screen.getByText(nycSummary);
    expect(citySummary).toBeInTheDocument();
  });

  test("renders Traits section", () => {
    render(<CityResponseCard {...mockProps} />);

    const traitsHeader = screen.getByText("Traits");
    expect(traitsHeader).toBeInTheDocument();
    const costOfLiving = screen.getByText("Cost of Living:");
    expect(costOfLiving).toBeInTheDocument();
    const crimeRate = screen.getByText("Crime Rate:");
    expect(crimeRate).toBeInTheDocument();
    const walkability = screen.getByText("WalkScore®");
    expect(walkability).toBeInTheDocument();
    const bikeability = screen.getByText("BikeScore®");
    expect(bikeability).toBeInTheDocument();
    const outdoorScore = screen.getByText("Outdoor Score:");
    expect(outdoorScore).toBeInTheDocument();
  });

  test("renders Population Stats section", () => {
    render(<CityResponseCard {...mockProps} />);

    const population = screen.getByText("Population:");
    expect(population).toBeInTheDocument();
    const populationDensity = screen.getByText("Population Density:");
    expect(populationDensity).toBeInTheDocument();
    const averagePopulationAge = screen.getByText("Average Population Age:");
    expect(averagePopulationAge).toBeInTheDocument();
  });

  test("renders Climate section", () => {
    render(<CityResponseCard {...mockProps} />);

    const climateHeader = screen.getByText("Climate");
    expect(climateHeader).toBeInTheDocument();
    const climateZone = screen.getByText("Climate Zone Description:");
    expect(climateZone).toBeInTheDocument();
    const winterTemp = screen.getByText("Average Winter Temperature:");
    expect(winterTemp).toBeInTheDocument();
    const summerTemp = screen.getByText("Average Summer Temperature:");
    expect(summerTemp).toBeInTheDocument();
    const snow = screen.getByText("Average Snowfall:");
    expect(snow).toBeInTheDocument();
    const rainfall = screen.getByText("Average Rainfall:");
    expect(rainfall).toBeInTheDocument();
  });

  test("renders Career section", () => {
    render(<CityResponseCard {...mockProps} />);

    const careerHeader = screen.getByText("Career");
    expect(careerHeader).toBeInTheDocument();
    const occupation = screen.getByText("Job Market:");
    expect(occupation).toBeInTheDocument();
    const politics = screen.getByText("State Politics:");
    expect(politics).toBeInTheDocument();
  });
});
