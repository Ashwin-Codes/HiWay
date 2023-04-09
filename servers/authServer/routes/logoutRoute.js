import express from "express";
const router = express.Router();

// Controllers
import logoutController from "../controllers/logoutController.js";

router.get("/logout", logoutController);
export default router;
