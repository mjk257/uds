import { render, screen, cleanup } from "@testing-library/react";
import ConfigurationList from '../ConfigurationList';
import {defaultCityPreferencesConfigurationSet} from "../../types/utility-types";

afterEach(() => {
    cleanup();
});

describe("Testing ConfigurationList component", () => {

    const mockProps = {
        setCurrentConfig: jest.fn(),
        allConfigs: defaultCityPreferencesConfigurationSet,
        currentConfigName: 'config1',
        setCurrentConfigName: jest.fn()
    }

    test("renders ConfigurationList header and configuration buttons", () => {
        render(<ConfigurationList { ...mockProps } />);

        const configurationListHeader = screen.getByText("Configurations");
        expect(configurationListHeader).toBeInTheDocument();
        const config1 = screen.getByText("Config 1");
        expect(config1).toBeInTheDocument();
        const config2 = screen.getByText("Config 2");
        expect(config2).toBeInTheDocument();
        const config3 = screen.getByText("Config 3");
        expect(config3).toBeInTheDocument();
        const config4 = screen.getByText("Config 4");
        expect(config4).toBeInTheDocument();
        const config5 = screen.getByText("Config 5");
        expect(config5).toBeInTheDocument();
    });
});
