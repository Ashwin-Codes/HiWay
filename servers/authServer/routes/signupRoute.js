import express from "express";
const router = express.Router();

// Controllers
import signupController from "../controllers/signupController.js";
router.post("/signup", signupController);
export default router;
