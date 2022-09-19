import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom'
import ParkingMarker from "../components/markers/ParkingMarker";

it("should render", () => {
    render(<ParkingMarker />);
    const element = screen.getByTestId("marker");
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Please log in to upload a parking spot!");
})