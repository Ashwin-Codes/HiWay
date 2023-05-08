import { render, screen } from "../../util/test-utils";
import UserCam from "./UserCam";

describe("UserCam", () => {
	it("should render without crash", () => {
		render(<UserCam />);
		const videoElement = screen.getByTestId("webcam-video");
		expect(videoElement).toBeInTheDocument();
	});
});
