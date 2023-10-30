import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Popup from "../Popup";

afterEach(() => {
    cleanup();
});

describe("Testing Popup Component", () => {

    const mockProps = {
        title: "Popup Title",
        content: "Popup Content",
        popupOpen: false,
        setPopupOpen: jest.fn()
    }

    test("Does not render popup text when popupOpen is false", () => {
        render(<Popup {...mockProps} />);

        const popupComponent = screen.queryByText("Popup Title");
        expect(popupComponent).toBeNull();
    });

    test("Renders popup text when popupOpen is true", () => {
        mockProps.popupOpen = true;
        render(<Popup {...mockProps} />);

        const popupComponent = screen.getByText("Popup Title");
        expect(popupComponent).toBeInTheDocument();
    });
});