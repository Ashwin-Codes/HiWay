import { render, screen } from "../../util/test-utils";
import UserCamControls from "./UserCamControls";

describe("UserCamControls", () => {
	it("should render without crash", () => {
		render(<UserCamControls />);
		const videoElement = screen.getByTestId("camera-off-btn");
		expect(videoElement).toBeInTheDocument();
	});
});
