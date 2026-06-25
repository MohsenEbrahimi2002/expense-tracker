import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { type Request, type Response } from "express";
import mongoose from "mongoose";
import type { AuthRequest } from "../middlewares/authMiddleware.js";

// Generate JWT token
const generateToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

export const registerUser = async (req: Request, res: Response) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  //Validation: check for missing fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    //Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    //Create the user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Unknown error occurred in registering User";
    res
      .status(500)
      .json({ message: "Error registering User", error: errorMessage });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invaild username or password" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Unknown error occurred in login user";
    res.status(500).json({ message: "Error login User", error: errorMessage });
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;

  

    const user = await User.findById(authReq.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err: unknown) {
    res.status(500).json({ message: "Error get user" });
  }
};
