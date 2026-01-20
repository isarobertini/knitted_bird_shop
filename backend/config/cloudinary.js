import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import { sendError } from "../utils/errorHandler.js"; // <-- import your error handler

dotenv.config();

try {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("✅ Cloudinary configured successfully");
} catch (err) {
    console.error("❌ Cloudinary configuration error:", err);
}

// Multer storage
const birdStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Birds",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        resource_type: "image",
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

// Multer middleware with standardized error handling
export const parser = multer({
    storage: birdStorage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.mimetype)) {
            // Use sendError pattern for logging (cannot call res here, so log)
            console.error("Invalid file type:", file.mimetype);
            return cb(new Error("Invalid file type. Only JPG, PNG, WEBP allowed."));
        }
        cb(null, true);
    }
});