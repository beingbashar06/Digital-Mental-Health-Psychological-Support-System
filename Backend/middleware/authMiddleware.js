import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    // 🔹 Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // 🔹 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    // 🔹 Find user (remove password field)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔹 Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
