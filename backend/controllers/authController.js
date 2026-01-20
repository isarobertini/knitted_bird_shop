import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/userModel.js";
import { sendError, sendSuccess } from "../utils/errorHandler.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// Helper: Generate JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role || "user" },
        JWT_SECRET,
        { expiresIn: "1d" }
    );
};

// ----------------- Register a new user -----------------
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return sendError(res, 400, "Missing required fields");
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return sendError(res, 400, "Email already in use");

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            role: "user",
        });

        const savedUser = await newUser.save();
        const token = generateToken(savedUser);

        sendSuccess(res, {
            token,
            user: { id: savedUser._id, username, email, role: savedUser.role }
        }, 201);
    } catch (err) {
        sendError(res, 500, "Server error during registration", err);
    }
};

// ----------------- Login user -----------------
export const loginUser = async (req, res) => {
    try {
        const { email, password, expectedRole } = req.body;
        if (!email || !password) return sendError(res, 400, "Missing email or password");

        const user = await UserModel.findOne({ email });
        if (!user) return sendError(res, 400, "Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return sendError(res, 400, "Invalid credentials");

        if (expectedRole && user.role !== expectedRole) {
            return sendError(res, 403, `This login form is only for ${expectedRole}s`);
        }

        const token = generateToken(user);

        sendSuccess(res, {
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });
    } catch (err) {
        sendError(res, 500, "Server error during login", err);
    }
};