import mongoose from "mongoose";
import { User } from "./userModel.js";

const farmSchema = new mongoose.Schema({
    farm_name: {
        type : String,
        required: true,
        trim: true,
    },
    location : {
        type: String, 
        required: true,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true,
    },
    crops : [
        {
            type : String
        }
    ]
}, {timestamps : true});

export const  Farm = mongoose.model('Farm',farmSchema)