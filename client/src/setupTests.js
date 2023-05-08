import "@testing-library/jest-dom";
import "setimmediate";

// Mock REST server
import { server } from "./mocks/server";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
