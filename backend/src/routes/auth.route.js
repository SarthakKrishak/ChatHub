const express = require("express");
const router = express.Router();
const {
    loginController,
    signupController,
    logoutController,
    updateProfile,
    checkAuth
} = require("../controllers/auth.controller.js");
const { isLoggedIn } = require("../middleware/isLoggedIn.js");


router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.put("/update-profile",isLoggedIn,updateProfile)
router.get("/check", isLoggedIn, checkAuth);

module.exports = router;
