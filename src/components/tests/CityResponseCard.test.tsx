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
    costOfLiving: "high",
    preferredOccupation: 100000,
    crimeRate: 45000,
    walkAndTransability: "high",
    partisan_lean: 25,
    qualityOfEducation: "high",
    zone_description: "humid subtropical",
    avgPopulationAge: 35
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
        const population = screen.getByText("Population: 8398748");
        expect(population).toBeInTheDocument();
        const populationDensity = screen.getByText("Population Density: 10933");
        expect(populationDensity).toBeInTheDocument();
        const costOfLiving = screen.getByText("Cost of Living: high");
        expect(costOfLiving).toBeInTheDocument();
        const numberOfJobs = screen.getByText("Number of Jobs: 100000");
        expect(numberOfJobs).toBeInTheDocument();
        const crimeRate = screen.getByText("Crime Rate: 45000");
        expect(crimeRate).toBeInTheDocument();
        const walkabilityTransability = screen.getByText("Walkability/Transability: high");
        expect(walkabilityTransability).toBeInTheDocument();
        const politics = screen.getByText("Politics: Democrat");
        expect(politics).toBeInTheDocument();
        const qualityOfEducation = screen.getByText("Quality of Education: high");
        expect(qualityOfEducation).toBeInTheDocument();
        const climate = screen.getByText("Climate: humid subtropical");
        expect(climate).toBeInTheDocument();
        const averagePopulationAge = screen.getByText("Average Population Age: 35");
        expect(averagePopulationAge).toBeInTheDocument();
    });
});