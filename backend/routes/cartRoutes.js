import express from "express";
import { authenticationUser } from "../middleware/authenticateUser.js";
import {
    getCart,
    buyBird,
    updateCartQuantity,
    deleteBirdCart,
    deleteCart,
    checkoutCart
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", authenticationUser, getCart);
router.put("/:birdId", authenticationUser, buyBird);
router.patch("/:birdId", authenticationUser, updateCartQuantity);
router.delete("/:birdId", authenticationUser, deleteBirdCart);
router.delete("/", authenticationUser, deleteCart);
router.post("/checkout", authenticationUser, checkoutCart);

export default router;