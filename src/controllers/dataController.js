import { asyncHandler, ApiError, ApiResponse } from "../utils/utils.js";
import { Image } from "../models/imageModel.js";
import { ModelResult } from "../models/modelResult.js"; 


export const getDetectionResult = asyncHandler(async (req, res) => {
    const { imageId } = req.params;

    // 1. Image record fetch karna aur result ko populate karna
    const imageRecord = await Image.findById(imageId)
        .populate('inference_result'); // ModelResult ko join karna

    if (!imageRecord) {
        throw new ApiError(404, "Image record not found.");
    }

    if (imageRecord.status !== 'COMPLETED' || !imageRecord.inference_result) {
        throw new ApiError(400, "Inference processing is not yet complete for this image.");
    }
    
    // Security Check: User ko Farm/Image ka owner hona chahiye (req.user._id se check karein)

    return res.status(200).json(
        new ApiResponse(
            200, 
            imageRecord.inference_result.detectionResult, // Final Disease/Detection Data
            "Disease detection results fetched successfully"
        )
    );
});

// GET /api/v1/data/yield-forecast (Mocking the LSTM output)
export const getYieldForecast = asyncHandler(async (req, res) => {
    // Yahan hum hardcoded time-series data return kar rahe hain (Forecasting Mock)
    const mockForecastData = [
        { month: "Apr-24", yield_tons: 4.5, temp_C: 35 },
        { month: "May-24", yield_tons: 5.2, temp_C: 38 },
        { month: "Jun-24", yield_tons: 6.1, temp_C: 30 }
    ];

    return res.status(200).json(
        new ApiResponse(
            200, 
            { farmId: req.query.farmId || "N/A", forecast: mockForecastData },
            "Yield forecast data fetched successfully (Mock)"
        )
    );
});