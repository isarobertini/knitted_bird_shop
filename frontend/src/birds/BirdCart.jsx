import { useCart } from "../context/CartContext.jsx";
import { Button } from "../ui/Button.jsx";

export const BirdCart = () => {
    // Access cart state and action functions from CartContext
    const {
        cart,
        updateQuantity,
        removeFromCart,
        clearCart,
        proceedToCheckout
    } = useCart();

    // Show message if the cart is empty 
    if (!cart.items.length) {
        return <p>Your cart is empty 🐣</p>;
    }
    // Calculate total price for all items in the cart
    const total = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    // Remove a single bird from the cart after confirmatio
    const handleRemove = (birdId, name) => {
        if (window.confirm(`Remove "${name}" from cart?`)) {
            removeFromCart(birdId);
        }
    };
    // Clear the entire cart after confirmation
    const handleClearCart = () => {
        if (window.confirm("Clear entire cart?")) {
            clearCart();
        }
    };

    return (
        <div>
            <ul>
                {cart.items.map(item => (
                    <li
                        key={item.birdId}
                        className="border p-4 mb-4 flex items-center gap-4"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded"
                        />

                        <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p>{item.price} kr</p>

                            <select
                                value={item.quantity}
                                onChange={e =>
                                    updateQuantity(
                                        item.birdId,
                                        Number(e.target.value)
                                    )
                                }
                                className="border rounded px-2 py-1 mt-1"
                            >
                                {Array.from(
                                    { length: item.maxQuantity },
                                    (_, i) => i + 1
                                ).map(n => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button
                            onClick={() =>
                                handleRemove(item.birdId, item.name)
                            }
                        >
                            Remove
                        </Button>
                    </li>
                ))}
            </ul>

            <p className="font-bold mt-4">Total: {total} kr</p>

            <Button onClick={handleClearCart} className="mt-2 mr-2">
                Clear cart
            </Button>

            <Button onClick={() => proceedToCheckout()} className="mt-2">
                Proceed to checkout
            </Button>
        </div>
    );
};