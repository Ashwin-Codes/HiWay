import { render, screen } from "../util/test-utils";
import Toastify from "./Toastify";
import { errorToast } from "./Toastify";

describe("Toastify component", () => {
	it("should render toast container", async () => {
		render(<Toastify />);
		errorToast({ message: "An error toast" });
		const alert = await screen.findByRole("alert");
		const alertMessage = await screen.findByText("An error toast");
		expect(alert).toBeInTheDocument();
		expect(alertMessage).toBeInTheDocument();
	});
});
