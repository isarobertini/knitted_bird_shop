import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import birdRouter from "./routes/birdRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRouter from "./routes/cartRoutes.js";

const app = express();

// CORS setup
const allowedOrigins = [
    "http://localhost:3000", // React dev server
    "http://localhost:5173", // Vite dev server
    process.env.FRONTEND_URL || "https://biiiiiiirds.netlify.app" // production frontend
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS policy: origin ${origin} not allowed`));
        }
    },
    credentials: true
}));

app.use(express.json());

// Default route
app.get("/", (req, res) => {
    res.send(" API is running...");
});

// API routes
app.use("/api/birds", birdRouter);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRouter);

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
);