import { render, screen, renderHook } from "../util/test-utils";
import userEvent from "@testing-library/user-event";
import useFormState from "./useFormState";
import formValidations from "../features/auth/formValidations";

describe("useFormState custom hook", () => {
	it("getFormState should return correct state", async () => {
		const { result } = renderHook(useFormState);
		const { emailValidation } = formValidations();
		const { getFormState, useInput } = result.current;

		function Component() {
			const { ref } = useInput("email", emailValidation);
			return (
				<div>
					<label htmlFor="test">input</label>
					<input id="test" type="text" ref={ref} />
				</div>
			);
		}
		const user = userEvent.setup();
		render(<Component />);
		let res = getFormState();
		expect(res.email.value).toBe("");
		expect(res.email.validation.error).toBe(true);
		expect(res.email.validation.failed).toBe("required");

		const input = screen.getByLabelText(/input/i);
		await user.type(input, "hello{enter}");
		res = getFormState();

		expect(res.email.value).toBe("hello");
		expect(res.email.validation.error).toBe(true);
		expect(res.email.validation.failed).toBe("validEmail");

		await user.clear(input);
		await user.type(input, "test@test.com{enter}");
		res = getFormState();
		expect(res.email.value).toBe("test@test.com");
		expect(res.email.validation.error).toBe(false);
		expect(res.email.validation.failed).toBe(null);
	});

	it("isValidForm should return correct state", async () => {
		const { result } = renderHook(useFormState);
		const { emailValidation } = formValidations();
		const { useInput, isValidForm } = result.current;

		function Component() {
			const { ref } = useInput("email", emailValidation);
			return (
				<div>
					<label htmlFor="test">input</label>
					<input id="test" type="text" ref={ref} />
				</div>
			);
		}
		const user = userEvent.setup();
		render(<Component />);

		let res = isValidForm();
		expect(res).toBe(false);

		const input = screen.getByLabelText(/input/i);
		await user.type(input, "test@test.com");

		res = isValidForm();
		expect(res).toBe(true);
	});

	describe("useInput returned hook", () => {
		it("should return correct values", () => {
			const { useInput } = useFormState();
			const { result } = renderHook(useInput);

			expect(result.current.ref).toBeDefined();
			expect(result.current.inFocus).toBeInstanceOf(Function);
			expect(result.current.clearInput).toBeInstanceOf(Function);
		});

		it("should focus the input element when inFocus function is called", async () => {
			function Component() {
				const { useInput } = useFormState();
				const { ref, inFocus } = useInput();
				return (
					<div>
						<label htmlFor="test">input</label>
						<input id="test" type="text" ref={ref} />
						<button
							onClick={() => {
								inFocus();
							}}>
							Test
						</button>
					</div>
				);
			}
			const user = userEvent.setup();
			render(<Component />);
			const input = screen.getByLabelText(/input/i);
			const btn = screen.getByText(/test/i);
			await user.click(btn);
			expect(input).toHaveFocus();
		});

		it("should clear input", async () => {
			function Component() {
				const { useInput } = useFormState();
				const { ref, clearInput } = useInput();
				return (
					<div>
						<label htmlFor="test">input</label>
						<input id="test" type="text" ref={ref} />
						<button
							onClick={() => {
								clearInput();
							}}>
							Test
						</button>
					</div>
				);
			}
			const user = userEvent.setup();
			render(<Component />);
			const input = screen.getByLabelText(/input/i);
			await user.type(input, "hello world");
			const btn = screen.getByText(/test/i);
			await user.click(btn);
			expect(input.value).toHaveLength(0);
		});
	});
});
