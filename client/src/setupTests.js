import "@testing-library/jest-dom";

// Mock REST server
import { server } from "./mocks/server";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
