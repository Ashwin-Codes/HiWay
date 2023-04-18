import { render, screen } from "../util/test-utils";
import Protected from "./Protected";
import { Navigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	Navigate: jest.fn(),
}));

describe("Protected component", () => {
	it("navigates to the sign in route when rendered with no auth", () => {
		render(<Protected />);
		expect(Navigate).toHaveBeenCalledWith({ to: "/login" }, {});
	});

	it("returns children component when renders with auth", () => {
		const preloadedState = {
			auth: {
				accessToken: true,
				username: true,
			},
		};
		render(
			<Protected>
				<h1>rendered with auth</h1>
			</Protected>,
			{ preloadedState }
		);
		const childEle = screen.getByText("rendered with auth", {
			exact: true,
		});
		expect(childEle).toBeInTheDocument();
	});
});
