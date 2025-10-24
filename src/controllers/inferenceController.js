import { Image } from "../models/imageModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { addInferenceJob } from "../config/queue.js";

export const submitInferenceJob = asyncHandler(async (req , res) => {
    const { farmId,imageUrl } = req.body;

    if(!farmId || !imageUrl ){
        throw new ApiError(400,"Farm ID and Image URL are required.");
    }

    const imageRecord = await Image.create({
        farm : farmId,
        uploadedBy : req.user._id,
        image_url : imageUrl,
        status : 'PENDING',
    });
    const job = await addInferenceJob({
        imageId : imageRecord._id,
        imageUrl : imageRecord.image_url
    });
    imageRecord.job_id = job.id;
    await imageRecord.save();

    return res.status(202).json(
        new ApiResponse(
            202,
            { imageId: imageRecord._id, jobId: job.id, status: 'PENDING' },
            "Image submitted for processing. Check status later."
        )
        );
});

// GET /api/v1/inference/status/:imageId
export const checkJobStatus = asyncHandler(async (req, res) => {
    const { imageId } = req.params;

    const image = await Image.findById(imageId).select('status job_id');
    
    if (!image) {
        throw new ApiError(404, "Image record not found.");
    }

    
    return res.status(200).json(new ApiResponse(200, {
        status: image.status,
        jobId: image.job_id,
       
    }, "Job status retrieved successfully."));
});
