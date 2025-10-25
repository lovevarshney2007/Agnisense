import mongoose from "mongoose";

const modelResultSchema = new mongoose.Schema({
    // Kis image ke liye yeh result hai
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true,
        unique: true, 
    },
    
    detectionResult: {
        type: Object, 
        required: true,
        // Example: { disease: "Potato Blight", confidence: 0.95, area_of_infection: "15%" }
    },
    // Forecasting Result data structure (LSTM output)
    forecastResult: {
        type: Object, // JSON structure to store yield prediction time-series data
        // Example: { predicted_yield: 5.5, unit: "Tons/Hectare", uncertainty: "0.8" }
    },
    modelName: {
        type: String, // e.g., CNN, U-Net, LSTM
        required: true,
    }
}, { timestamps: true });

export const ModelResult = mongoose.model('ModelResult', modelResultSchema);