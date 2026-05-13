import express from "express";
import { protect } from "../middlewares/authMiddleware.ts";
import { getDashboardData } from "../controllers/dashboardController.ts";

const router = express.Router();

router.get("/", protect, getDashboardData);

export default router;
