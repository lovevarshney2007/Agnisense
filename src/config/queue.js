import { Queue } from "bullmq";

const connection = {
    host : process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
};

 const inferenceQueue = new Queue('inferenceQueue', {connection});

 const addInferenceJob = async (imageInfo) => {
    try {
        const job = await inferenceQueue.add('processImage',imageInfo, {
            attempts : 3,
            backoff : {
                type : 'exponential',
                delay : 1000,
            },
        });
        return job.id;
    } catch (error) {
        console.error("Failed to add job", error);
        throw new ApiError(
            503, 
            "ML Service Queue is currently unavailable. Please try again later."
        );
    }
};

export {
    inferenceQueue,
    addInferenceJob
}