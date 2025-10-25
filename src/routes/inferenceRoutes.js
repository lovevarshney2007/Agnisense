import express from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { submitInferenceJob,checkJobStatus } from "../controllers/inferenceController.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/submit", upload.single('crop_image'), submitInferenceJob); // 'crop_image' is the field name
router.get("/status/:imageId",checkJobStatus);

export default router;