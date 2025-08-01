import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.model.js";

export const isLoggedIn = async (req, res, next) => {
    try {
        // Extract token from cookies or authorization header
        const token = req.cookies.jwt || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password"); // we are not selecting the password for security.

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
