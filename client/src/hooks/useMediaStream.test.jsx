import { renderHook } from "../util/test-utils";
import useMediaStream from "./useMediaStream";

describe("useMediaStream custom hook", () => {
	it("should return media functions", () => {
		const { result } = renderHook(useMediaStream);
		const { getUserStream, mergeStreams } = result.current;
		expect(typeof getUserStream).toBe("function");
		expect(typeof mergeStreams).toBe("function");
	});
});
