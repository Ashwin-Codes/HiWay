import { rest } from "msw";
import { devServerUrl, apiRoutes } from "../configs/routes";
import signInController from "./mock-controllers/signInController";
export const handlers = [rest.post(devServerUrl + apiRoutes.signin, signInController)];
