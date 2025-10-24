import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { ApiError } from "./utils/ApiError.js";
import farmRoutes from "./routes/farmRoutes.js";
import inferenceRoutes from "./routes/inferenceRoutes.js";

//load environment Variables
dotenv.config();

// connect to mongodb
connectDb();

// initiallize express app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// test routes
app.get("/",(req,res) => {
    res.send("Agrisense Backend is running");
})

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/farms", farmRoutes);
app.use("/api/v1/inference", inferenceRoutes);

app.use(errorMiddleware)

// server listening
const PORT = process.env.PORT || 8000;
app.listen(PORT , () =>{
    console.log(`Server running on port ${PORT}`);
})
