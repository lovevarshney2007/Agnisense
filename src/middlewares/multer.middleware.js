import multer from "multer";
import { ApiError } from "../utils/utils.js";
import path from "path";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./public/uploads");
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
        cb(null,file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image/')){
        cb(null,true);
    }
    else{
        cb(new ApiError(400, "Only images are allowed for upload!"), false);
    }
};

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5Mb limit
    }
});