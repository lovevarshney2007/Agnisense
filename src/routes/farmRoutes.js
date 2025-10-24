import express from "express"
import {
    createFarm,
    getAllFarms,
    updateFarm,
    deleteFarm,
} from "../controllers/farmController.js";

import {verifyJWT} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/", createFarm);
router.get("/",getAllFarms);
router.put("/:id",updateFarm);
router.delete("/:id",deleteFarm);

export default router;