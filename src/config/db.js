import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected : ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`Mongodb connection failed : `,error.message);
        process.exit(1);
    }
};

export default connectDb;