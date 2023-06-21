import { render, screen } from "../util/test-utils";
import Home from "./Home";

describe("Homepage", () => {
	it("should render correctly", () => {
		render(<Home />);
		const createHiwayButton = screen.getByRole("button", {
			name: /create hiway/i,
		});
		expect(createHiwayButton).toBeInTheDocument();
	});
});
