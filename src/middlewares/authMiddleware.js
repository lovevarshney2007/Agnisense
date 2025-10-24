import JWT from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {User} from "../models/userModel.js"


// middleware to check for a valid JWT token
export const verifyJWT = asyncHandler(async(req , res,next) => {
 const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
        const decodedToken = JWT.verify(token,process.env.JWT_SECRET)

        const user = await User.findById(decodedToken?._id).select
        ("-password -refreshToken");

        if(!user){
             throw new ApiError(401,"Invalid Acess Token")
        }
        req.user = user;
        next();
})