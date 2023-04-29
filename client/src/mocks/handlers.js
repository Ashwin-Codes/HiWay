import { rest } from "msw";
import { devServerUrl, apiRoutes } from "../configs/routes";

import signInController from "./mock-controllers/signInController";
import signUpController from "./mock-controllers/signUpController";
import refreshTokenController from "./mock-controllers/refreshTokenController";

export const handlers = [
	rest.post(devServerUrl + apiRoutes.signin, signInController),
	rest.post(devServerUrl + apiRoutes.signup, signUpController),
	rest.get(devServerUrl + apiRoutes.refresh, refreshTokenController),
];
