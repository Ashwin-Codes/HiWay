import express from "express";
const router = express.Router();

// Controllers
import refreshTokenController from "../controllers/refreshTokenController.js";

router.get("/refresh", refreshTokenController);

export default router;
