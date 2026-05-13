import express, { type Router } from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
} from "../controllers/authController.ts";
import { protect } from "../middlewares/authMiddleware.ts";
import upload from "../middlewares/uploadMiddleware.ts";

const router: Router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getuser", protect, getUserInfo);
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

export default router;
