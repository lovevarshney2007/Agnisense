import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    farm : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Farm',
        required : true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image_url: { 
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'],
        default: 'PENDING',
    },
    job_id: {
        type: String, 
    },
    inference_result: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ModelResult', 
    }
}, {timestamps : true});

export const Image = mongoose.model('Image', imageSchema);