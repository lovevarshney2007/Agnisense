import {User} from "../models/userModel.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Register Controller
const registerController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    throw new ApiError(400, "Please Provide name,email, and Password");
  }

  // Check if user Already exist or not
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User Already registered, Please Login");
  }

  // Hash Password & Save
  const HashedPassword = await hashPassword(password);
  const user = await User.create({
    name,
    email,
    password: HashedPassword,
  });

  // success registeration
  return res.status(201).json(
    new ApiResponse(
      201,
      {
        name: user.name,
        email: user.email,
      },
      "User Registered Successfully"
    )
  );
});

// Login controller
const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    throw new ApiError(400, "Email And Password Are Required");
  }

  // find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "Email is not registered");
  }

  // compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new ApiError(401, "Invalid password");
  }

  const token = await JWT.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
      "Login Successfully"
    )
  );
});

export{
    registerController,
    loginController
}
