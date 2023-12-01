import { render, screen, cleanup } from "@testing-library/react";
import Header from "../Header";

afterEach(() => {
    cleanup();
});

describe("Testing Header component", () => {

    test("Renders all parts of the header (title + toolbar buttons)", () => {
        render(<Header setSearch={()=>{}} setReturnedCities={()=>{}}/>);

        const header = screen.getByText("UDS: Urban Discovery System");
        expect(header).toBeInTheDocument();
        const aboutUsButton = screen.getByText("About Us");
        expect(aboutUsButton).toBeInTheDocument();
        const helpButton = screen.getByText("Help");
        expect(helpButton).toBeInTheDocument();
        const creditsButton = screen.getByText("Credits");
        expect(creditsButton).toBeInTheDocument();
        const gitHubIcon = screen.getByTestId("github-header-icon");
        expect(gitHubIcon).toBeInTheDocument();
    });
});