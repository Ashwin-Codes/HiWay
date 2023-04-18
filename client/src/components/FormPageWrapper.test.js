import { render, screen } from "../util/test-utils";
import FormPageWrapper from "./FormPageWrapper";
import illustration from "../assets/p2p-illustration.svg";

describe("Form page wrapper component", () => {
	it("should render correctly", () => {
		render(<FormPageWrapper />);
		const logoElement = screen.getByText(/hiway/i);
		expect(logoElement).toBeInTheDocument();
	});

	it("should render passed children", () => {
		const textVal = "child element";
		render(
			<FormPageWrapper>
				<h1>{textVal}</h1>
			</FormPageWrapper>
		);
		const logoElement = screen.getByText(textVal);
		expect(logoElement).toBeInTheDocument();
	});

	it("should render illustration img with correct source", () => {
		render(<FormPageWrapper />);
		const imgElement = screen.getByRole("img");
		expect(imgElement).toHaveAttribute("src", illustration);
	});
});
