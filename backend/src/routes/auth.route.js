import express from "express";
const router = express.Router();
import {
  loginController,
  signupController,
  logoutController,
  updateProfile,
  checkAuth
} from "../controllers/auth.controller.js"

import { isLoggedIn } from "../middleware/isLoggedIn.js";
router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.put("/update-profile", isLoggedIn, updateProfile);
router.get("/check", isLoggedIn, checkAuth);

export default router;
