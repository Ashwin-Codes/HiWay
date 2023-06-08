import express from "express";
import path from "path";
const router = express.Router();

// Serving frontend
router.use(express.static(path.resolve("../../client", "build")));
router.get("/*", (req, res) => {
	res.sendFile(path.resolve("../../client", "build", "index.html"));
});

export default router;
