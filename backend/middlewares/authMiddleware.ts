import jwt from "jsonwebtoken";
import User, { type UserType } from "../models/User.ts";
import type { NextFunction, Request, Response } from "express";
import type mongoose from "mongoose";

export interface AuthRequest extends Request {
  user: {
    _id: mongoose.Types.ObjectId;
    fullName: string;
    email: string;
  };
}
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    (req as AuthRequest).user = user;

    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
