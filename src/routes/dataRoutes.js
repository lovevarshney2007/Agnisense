import express from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { getDetectionResult, getYieldForecast } from "../controllers/dataController.js";

const router = express.Router();

router.use(verifyJWT); 


router.get("/disease-detection/:imageId", getDetectionResult);
router.get("/yield-forecast", getYieldForecast);

export default router;
