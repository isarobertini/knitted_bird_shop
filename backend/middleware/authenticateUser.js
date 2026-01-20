import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";
import { sendError } from "../utils/errorHandler.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// ----------------- Middleware: Authenticate user -----------------
export const authenticationUser = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return sendError(res, 401, "No or invalid token provided");
    }

    const token = authHeader.split(" ")[1];
    if (!token) return sendError(res, 401, "Token missing");

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded?.id) return sendError(res, 401, "Invalid token payload");

        const user = await UserModel.findById(decoded.id).select("-password");
        if (!user) return sendError(res, 401, "User not found");

        req.user = {
            _id: user._id,
            role: user.role,
            email: user.email,
            username: user.username
        };

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return sendError(res, 401, "Token expired");
        }
        return sendError(res, 401, "Invalid token", error);
    }
};