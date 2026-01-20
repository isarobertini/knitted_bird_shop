import express from "express";
import { parser } from "../config/cloudinary.js";
import { authenticationUser } from "../middleware/authenticateUser.js";
import { adminOnly } from "../middleware/adminOnly.js";

// ------------------ Controllers ------------------
import {
    getBirds,
    getBirdById,
    postBird,
    updateBird,
    deleteBird
} from "../controllers/birdController.js";


const router = express.Router();

// ------------------ Public routes ------------------
router.get("/", getBirds);         // Get all birds
router.get("/:id", getBirdById);   // Get bird by ID

// ------------------ Admin routes ------------------
router.post("/", authenticationUser, adminOnly, parser.single("image"), postBird);
router.patch("/:id", authenticationUser, adminOnly, updateBird);
router.delete("/:id", authenticationUser, adminOnly, deleteBird);

export default router;