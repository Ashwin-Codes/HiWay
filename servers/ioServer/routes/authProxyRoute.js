import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
const router = express.Router();

const proxy = createProxyMiddleware({
	target: process.env.AUTH_SERVER_URL,
	changeOrigin: true,
	onError: (err, req, res) => {
		if (err) {
			res.sendStatus(500);
		}
	},
});

router.post("/signup", proxy);
router.post("/login", proxy);
router.get("/refresh", proxy);
router.get("/logout", proxy);

export default router;
