import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { getJSON } from "../utils/Api.js";

// Create a context for the cart state
const CartContext = createContext();

// Custom hook to consume the cart context
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { token } = useAuth(); // Auth token for API requests
    const navigate = useNavigate(); //Redirect login
    const BASE_URL = import.meta.env.VITE_API_URL; //API

    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(false);

    // ----------------- FETCH CART -----------------
    // Fetch the current cart from the backend
    const fetchCart = async () => {
        if (!token) {
            // If user is not logged in, reset cart to empty
            setCart({ items: [] });
            return;
        }

        try {
            const data = await getJSON(`${BASE_URL}/cart`);
            setCart({ items: data.items || [] });
        } catch (err) {
            console.error(err);
            setCart({ items: [] });
        }
    };

    useEffect(() => {
        fetchCart();
    }, [token]);

    /* ----------------- CART HELPERS ----------------- */

    const getItemInCart = (birdId) =>
        cart.items.find(item => item.birdId === birdId);

    const getQuantityInCart = (birdId) =>
        getItemInCart(birdId)?.quantity || 0;

    const canAddToCart = (bird) =>
        getQuantityInCart(bird._id) < bird.amount;

    /* ----------------- CART ACTIONS ----------------- */

    const addToCart = async (bird, quantity = 1) => {
        // Not logged in
        if (!token) {
            const goToLogin = window.confirm(
                "Please log in to add a bird to your cart.\n\nGo to login page now?"
            );

            if (goToLogin) {
                navigate("/login");
            }

            return; // stop here either way
        }

        // Already logged in — ask confirmation
        const confirmAdd = window.confirm(
            `Are you sure you want to put "${bird.name}" into your cart?`
        );

        if (!confirmAdd) return; // stop if user cancels

        // Call backend
        await getJSON(`${BASE_URL}/cart/${bird._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity }),
        });

        // Refresh cart state
        await fetchCart();
    };

    //UPDATE cart quantity
    const updateQuantity = async (birdId, quantity) => {
        await getJSON(`${BASE_URL}/cart/${birdId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity }),
        });

        await fetchCart();
    };

    //REMOVE bird from cart
    const removeFromCart = async (birdId) => {
        await getJSON(`${BASE_URL}/cart/${birdId}`, {
            method: "DELETE",
        });

        await fetchCart();
    };

    //Proceed to checkout (not implemented yet)
    const proceedToCheckout = async () => {
        alert("This function is not implemented yet. Please contact mi.robertini@gmail.com for inquiries.");
    };


    //CLEAR cart
    const clearCart = async () => {
        await getJSON(`${BASE_URL}/cart`, { method: "DELETE" });
        setCart({ items: [] });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,

                // helpers
                getQuantityInCart,
                canAddToCart,

                // actions
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                proceedToCheckout,

                totalItems: cart.items.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                ),
            }}
        >
            {children}
        </CartContext.Provider>
    );
};