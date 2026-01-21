import { useCart } from "../context/CartContext.jsx";
import { Button } from "../ui/Button.jsx";
import { Link } from "react-router-dom";

export const BirdCart = () => {
    const {
        cart,
        updateQuantity,
        removeFromCart,
        clearCart,
        proceedToCheckout
    } = useCart();

    if (!cart.items.length) {
        return <p>Your cart is empty!</p>;
    }

    const total = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleRemove = (birdId, name) => {
        if (window.confirm(`Remove "${name}" from cart?`)) {
            removeFromCart(birdId);
        }
    };

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
                        className="border bg-white rounded-sm p-4 mb-4 flex items-center gap-4"
                    >
                        {/* CLICKABLE AREA */}
                        <Link
                            to={`/birds/${item.birdId}`}
                            className="flex items-center gap-4 flex-1 hover:opacity-80"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded"
                            />

                            <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <p>{item.price} kr</p>
                            </div>
                        </Link>

                        {/* CONTROLS */}
                        <div className="flex flex-col items-end gap-2">
                            <select
                                value={item.quantity}
                                onChange={e =>
                                    updateQuantity(
                                        item.birdId,
                                        Number(e.target.value)
                                    )
                                }
                                className="border rounded px-2 py-1"
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

                            <Button
                                onClick={() =>
                                    handleRemove(item.birdId, item.name)
                                }
                            >
                                Remove
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>

            <p className="font-bold mt-4">Total: {total} kr</p>

            <Button onClick={handleClearCart} className="mt-2 mr-2">
                Clear cart
            </Button>

            <Button onClick={proceedToCheckout} className="mt-2">
                Proceed to checkout
            </Button>
        </div>
    );
};
