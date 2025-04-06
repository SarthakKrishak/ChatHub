const { generateToken } = require("../utils/util.js");
const User = require("../models/user.model.js");
const bcrypt = require('bcryptjs');
const cloudinary = require('../utils/cloudinary.js')

module.exports.signupController = async (req, res) => {
  const { fullName, email, password } = req.body;
    try {
      if (!fullName || !email || !password) {
          return res.status(400).json({ message: "Please fill in all fields" });
        }
    //hash password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
          fullName, email, password: hashedPassword
      })

      if (newUser) {
          //generate JWT token
          generateToken(newUser._id, res);
          return res.status(201).json({
              message: "User created successfully",
              _id: newUser._id,
              fullName: newUser.fullName,
              email: newUser.email,
              profilePic: newUser.profilePic,
           });
      } else {
          return res.status(400).json({ message: "Invalid user data" });
      }

  } catch (error) {
      console.log("Error in signup controller",error.message);
      res.status(500).json({ message: "Server error. Please try again later." });
  }
};


module.exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      message: "Logged in successfully",
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    })


  } catch (error) {
    console.log("Error in login controller",error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


module.exports.logoutController = (req, res) => {
    try {
      res.cookie('token', "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
};


module.exports.updateProfile = async(req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });
    res.status(200).json({ message: "Profile updated successfully", updatedUser });

  } catch (error) {
    console.log("Error in update profile controller", error.message);
    res.status(500).json({ message: "Server error. Please try again late" });
  }

}

module.exports.checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in check auth controller", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}