import express from "express";
const router = express.Router();

// Controllers
import { getQuotes } from "../controllers/quotesController.js";

router.get("/quotes", getQuotes);
export default router;
