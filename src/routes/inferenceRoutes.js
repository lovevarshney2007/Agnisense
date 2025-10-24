import express from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { submitInferenceJob,checkJobStatus } from "../controllers/inferenceController.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/submit",submitInferenceJob)

router.get("/status/:imageId",checkJobStatus);

export default router;