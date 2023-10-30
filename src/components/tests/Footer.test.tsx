import { render, screen, cleanup } from "@testing-library/react";
import Footer from "../Footer";

afterEach(() => {
    cleanup();
});

describe("Testing Footer component", () => {

    test("renders Footer Component", () => {
        render(<Footer />);

        const footerText = screen.getByTestId('uds-footer-test');
        expect(footerText).toBeInTheDocument();
        const githubIcon = screen.getByTestId('github-footer-icon');
        expect(githubIcon).toBeInTheDocument();
    });
});