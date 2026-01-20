import { sendError, sendSuccess } from "../utils/errorHandler.js";


export const adminOnly = (req, res, next) => {
    if (!req.user) return sendError(res, 401, "Not authenticated");
    if (req.user.role !== "admin") return sendError(res, 403, "Admins only");
    next();
};