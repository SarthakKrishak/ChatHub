import generateToken from "../utils/util.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import cloudinary from '../utils/cloudinary.js'

export const signupController = async (req, res) => {
  
  const { fullName, email, password } = req.body; // For this to work we have to use the middleware express.json
  
    try {
      if (!fullName || !email || !password) {
          return res.status(400).json({ message: "Please fill in all fields" });
        }
    //hashing the password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
      const user = await User.findOne({ email });
      
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
      }
      
      const salt = await bcrypt.genSalt(10); //generating the salt
      const hashedPassword = await bcrypt.hash(password, salt);

      // new user created
      const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword
      })

      if (newUser) {
          //generate JWT token
        generateToken(newUser._id, res);
        await newUser.save();
        console.log("Hashed Password",hashedPassword);
        
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
      res.status(500).json({message: "Server error. Please try again later."});
  }
};

export const loginController = async (req, res) => {

  const { email, password } = req.body;

  try {

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({ message: "Invalid Credentials" });
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

export const logoutController = (req, res) => {
    try {
      res.cookie('jwt', '', { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const updateProfile = async(req, res) => {
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
    console.log("Error in update profile controller", error);
    res.status(500).json({ message: "Server error. Please try again late" });
  }

}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in check auth controller", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}