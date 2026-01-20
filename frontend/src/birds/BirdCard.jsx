import { useCart } from "../context/CartContext.jsx";
import { Button } from "../ui/Button.jsx";

export const BirdCard = ({ bird }) => {
    // Access cart logic and helper functions from CartContext
    const { canAddToCart, addToCart } = useCart();

    // Determine if the bird is out of stock based on cart quantity vs available stock
    const outOfStock = !canAddToCart(bird);

    return (
        <div className="border p-4 rounded-md">
            <img
                src={bird.image}
                alt={bird.name}
                className="h-48 w-full object-cover mb-3 rounded"
            />

            <h2 className="font-medium">{bird.name}</h2>
            <p>{bird.price} kr</p>
            <p>In stock: {bird.amount}</p>

            <Button
                disabled={outOfStock}
                onClick={() => addToCart(bird, 1)}
            >
                {outOfStock ? "Sold out" : "Add to cart"}
            </Button>
        </div>
    );
};