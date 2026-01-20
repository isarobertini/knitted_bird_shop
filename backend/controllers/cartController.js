import Cart from "../models/cartModel.js";
import Bird from "../models/birdModel.js";
import { sendError, sendSuccess } from "../utils/errorHandler.js";

// GET user's cart
export const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        let cart = await Cart.findOne({ user: userId }).lean();
        if (!cart) cart = { user: userId, items: [] };

        const itemsWithStock = await Promise.all(
            cart.items.map(async item => {
                const bird = await Bird.findById(item.birdId).lean();
                return {
                    ...item,
                    maxQuantity: bird ? bird.amount : 0
                };
            })
        );

        sendSuccess(res, { ...cart, items: itemsWithStock });
    } catch (err) {
        sendError(res, 500, "Error fetching cart", err);
    }
};

// ADD bird to cart (STOCK SAFE)
export const buyBird = async (req, res) => {
    try {
        const { birdId } = req.params;
        const { quantity = 1 } = req.body;
        const userId = req.user._id;

        const qtyToAdd = parseInt(quantity);
        if (!qtyToAdd || qtyToAdd < 1) {
            return sendError(res, 400, "Invalid quantity");
        }

        const bird = await Bird.findById(birdId);
        if (!bird) return sendError(res, 404, "Bird not found");

        let cart = await Cart.findOne({ user: userId });
        if (!cart) cart = new Cart({ user: userId, items: [] });

        const itemIndex = cart.items.findIndex(
            i => i.birdId.toString() === birdId
        );

        const currentQty =
            itemIndex > -1 ? cart.items[itemIndex].quantity : 0;

        const newQty = currentQty + qtyToAdd;

        // 🚨 STOCK CHECK
        if (newQty > bird.amount) {
            return sendError(
                res,
                400,
                `Only ${bird.amount} "${bird.name}" available`
            );
        }

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = newQty;
        } else {
            cart.items.push({
                birdId: bird._id,
                name: bird.name,
                price: bird.price,
                image: bird.image,
                quantity: qtyToAdd
            });
        }

        await cart.save();
        sendSuccess(res, { cart });
    } catch (err) {
        sendError(res, 500, "Error adding bird to cart", err);
    }
};

// UPDATE quantity (STOCK SAFE)
export const updateCartQuantity = async (req, res) => {
    try {
        const { birdId } = req.params;
        const { quantity } = req.body;
        const userId = req.user._id;

        const qty = parseInt(quantity);
        if (!qty || qty < 1) {
            return sendError(res, 400, "Invalid quantity");
        }

        const bird = await Bird.findById(birdId);
        if (!bird) return sendError(res, 404, "Bird not found");

        if (qty > bird.amount) {
            return sendError(
                res,
                400,
                `Only ${bird.amount} available`
            );
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return sendError(res, 404, "Cart not found");

        const item = cart.items.find(
            i => i.birdId.toString() === birdId
        );
        if (!item) return sendError(res, 404, "Bird not in cart");

        item.quantity = qty;
        await cart.save();

        sendSuccess(res, { cart });
    } catch (err) {
        sendError(res, 500, "Error updating cart quantity", err);
    }
};

// DELETE bird from cart
export const deleteBirdCart = async (req, res) => {
    try {
        const { birdId } = req.params;
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return sendError(res, 404, "Cart not found");

        cart.items = cart.items.filter(
            i => i.birdId.toString() !== birdId
        );

        await cart.save();
        sendSuccess(res, { message: "Bird removed from cart" });
    } catch (err) {
        sendError(res, 500, "Error deleting bird from cart", err);
    }
};

// DELETE entire cart
export const deleteCart = async (req, res) => {
    try {
        const userId = req.user._id;
        await Cart.findOneAndDelete({ user: userId });
        sendSuccess(res, { message: "Cart deleted successfully" });
    } catch (err) {
        sendError(res, 500, "Error deleting cart", err);
    }
};

// CHECKOUT (kept to match routes)
export const checkoutCart = async (req, res) => {
    try {
        const userId = req.user._id;
        sendSuccess(res, {
            message: `Checkout simulation for user ${userId}`
        });
    } catch (err) {
        sendError(res, 500, "Checkout error", err);
    }
};