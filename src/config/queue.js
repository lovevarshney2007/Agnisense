import { Queue } from "bullmq";

const connection = {
    host : process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
};

export const inferenceQueue = new Queue('inferenceQueue', {connection});

export const addInferenceJob = async (imageInfo) => {
    return await inferenceQueue.add('processImage',imageInfo, {
        attempts : 3,
        backoff : {
            type : 'exponential',
            delay : 1000,
        },
    });
};

