import { render, screen, cleanup } from "@testing-library/react";
import CityResponseCard from "../CityResponseCard";

afterEach(() => {
    cleanup();
});

const nycSummary = "New York City is a city in the United States. " +
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

const mockCityDetails = {
    summary: nycSummary,
    name: "New York City",
    state: "NY",
    population: 8398748,
    density: 10933,
    costOfLiving: 20,
    preferredOccupation: 100000,
    crimeRate: 45000,
    walkAndTransability: 20,
    partisan_lean: 25,
    outdoorScore: 79,
    zone_description: "humid subtropical",
    median_age: 35
}

describe("Testing ConfigurationList component", () => {

    const mockProps = {
        cityDetails: mockCityDetails,
        rank: 1
    }

    test("renders ConfigurationList header and configuration buttons", () => {
        render(<CityResponseCard { ...mockProps } />);

        const cityName = screen.getByText("1.) New York City, NY");
        expect(cityName).toBeInTheDocument();
        const citySummary = screen.getByText(nycSummary);
        expect(citySummary).toBeInTheDocument();
        const population = screen.getByText("Population:");
        expect(population).toBeInTheDocument();
        const populationDensity = screen.getByText("Population Density:");
        expect(populationDensity).toBeInTheDocument();
        const costOfLiving = screen.getByText("Cost of Living:");
        expect(costOfLiving).toBeInTheDocument();
        const numberOfJobs = screen.getByText("Job Market:");
        expect(numberOfJobs).toBeInTheDocument();
        const crimeRate = screen.getByText("Crime Rate:");
        expect(crimeRate).toBeInTheDocument();
        const walkScore = screen.getByText("WalkScore®");
        expect(walkScore).toBeInTheDocument();
        const bikeScore = screen.getByText("BikeScore®");
        expect(bikeScore).toBeInTheDocument();
        const politics = screen.getByText("State Politics:");
        expect(politics).toBeInTheDocument();
        const outdoorScore = screen.getByText("Outdoor Score:");
        expect(outdoorScore).toBeInTheDocument();
        const climate = screen.getByText("Climate Zone Description:");
        expect(climate).toBeInTheDocument();
        const rainfall = screen.getByText("Average Rainfall:");
        expect(rainfall).toBeInTheDocument();
        const snow = screen.getByText("Average Snowfall:");
        expect(snow).toBeInTheDocument();
        const summerTemp = screen.getByText("Average Summer Temperature:");
        expect(summerTemp).toBeInTheDocument();
        const winterTemp = screen.getByText("Average Winter Temperature:");
        expect(winterTemp).toBeInTheDocument();
        const averagePopulationAge = screen.getByText("Average Population Age:");
        expect(averagePopulationAge).toBeInTheDocument();
    });
});