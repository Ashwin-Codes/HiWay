import express from "express";
const router = express.Router();

// Controllers
import verifyUserController from "../controllers/api/verifyUserController.js";

router.post("/verifyUser", verifyUserController);

export default router;
