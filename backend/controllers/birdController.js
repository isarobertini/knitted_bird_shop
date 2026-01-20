import Bird from "../models/birdModel.js";
import { sendError, sendSuccess } from "../utils/errorHandler.js";

// POST a new bird (admin)
export const postBird = async (req, res) => {
    try {
        const { name, size, material, amount, price, description } = req.body;
        if (!name || !size || !amount || !price) return sendError(res, 400, "Missing required fields");
        if (!req.file) return sendError(res, 400, "Image is required");

        const newBird = new Bird({
            name, size, material, amount, price, description, image: req.file.path
        });

        const savedBird = await newBird.save();
        sendSuccess(res, { bird: savedBird }, 201);
    } catch (err) {
        sendError(res, 500, "Server error while posting bird", err);
    }
};

// GET all birds
export const getBirds = async (req, res) => {
    try {
        const birds = await Bird.find().sort({ createdAt: -1 });
        sendSuccess(res, { birds });
    } catch (err) {
        sendError(res, 500, "Error fetching birds", err);
    }
};

// GET bird by ID
export const getBirdById = async (req, res) => {
    try {
        const bird = await Bird.findById(req.params.id);
        if (!bird) return sendError(res, 404, "Bird not found");
        sendSuccess(res, { bird });
    } catch (err) {
        sendError(res, 500, "Error fetching bird", err);
    }
};

// PATCH / DELETE bird (admin)
export const updateBird = async (req, res) => {
    try {
        const bird = await Bird.findById(req.params.id);
        if (!bird) return sendError(res, 404, "Bird not found");

        Object.assign(bird, req.body); // update fields dynamically
        await bird.save();
        sendSuccess(res, { bird, message: "Bird updated successfully" });
    } catch (err) {
        sendError(res, 500, "Error updating bird", err);
    }
};

export const deleteBird = async (req, res) => {
    try {
        const bird = await Bird.findById(req.params.id);
        if (!bird) return sendError(res, 404, "Bird not found");

        await bird.deleteOne();
        sendSuccess(res, { message: "Bird deleted successfully" });
    } catch (err) {
        sendError(res, 500, "Error deleting bird", err);
    }
};