import { useRef, useCallback } from "react";

export default function useFormState() {
	const inputs = {};

	function useInput(inputName, inputValidation = {}) {
		const ref = useRef(null);

		inputs[inputName] = ref;
		inputs[inputName].validation = inputValidation;

		const inFocus = useCallback(() => {
			ref?.current?.focus();
		}, []);

		const clearInput = useCallback(() => {
			if (ref.current?.value) {
				ref.current.value = "";
			}
		}, []);

		return { ref, inFocus, clearInput };
	}

	function validate(inputName, inputValue) {
		const validationFunctions = Object.keys(inputs[inputName].validation);

		const validationState = {
			error: false,
			failed: null,
		};

		if (Object.keys(validationFunctions).length <= 0) return validationState;
		for (let func in inputs[inputName].validation) {
			if (!inputs[inputName].validation[func](inputValue)) {
				validationState.error = true;
				validationState.failed = func;
				return validationState;
			}
		}

		return validationState;
	}

	function getFormState() {
		const formState = {};
		const allInputs = Object.keys(inputs);
		allInputs.forEach((inputKey) => {
			formState[inputKey] = {
				value: inputs[inputKey].current?.value,
				validation: { ...validate(inputKey, inputs[inputKey].current?.value) },
			};
		});
		return formState;
	}

	function isValidForm() {
		const formState = getFormState();
		const allInputs = Object.keys(formState);
		const isValid = allInputs.every((input) => !formState[input].validation.error);
		return isValid;
	}

	return { useInput, getFormState, isValidForm };
}
