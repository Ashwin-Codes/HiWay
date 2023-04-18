import animateLogo from "./animateLogo";

jest.useFakeTimers();

describe("animateLogo utility function", () => {
	it("should return interval id", () => {
		let ref = { current: "HiWay" };
		const intervalId = animateLogo(ref, () => {});
		expect(typeof intervalId).toBe("number");
	});

	it("should update passed ref", async () => {
		let ref = { current: "HiWay" };
		animateLogo(ref, () => {});
		jest.advanceTimersByTime(100);
		expect(ref).not.toBe("HiWay");
		expect(ref).not.toBeFalsy();
	});

	it("should call setterFunction", async () => {
		let ref = { current: "HiWay" };
		let setterFunction = jest.fn();
		animateLogo(ref, setterFunction);
		jest.advanceTimersByTime(100);
		expect(setterFunction).toBeCalled();
		expect(ref).not.toBe("HiWay");
	});
});
