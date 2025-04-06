const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.isLoggedIn = async (req, res, next) => {
    try {
        // Extract token from cookies or authorization header
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // Attach user to request object for further use

        next();
    } catch (error) {
        console.error("Error in middleware:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};
