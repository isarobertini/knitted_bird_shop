import { useCart } from "../context/CartContext.jsx";
import { Button } from "../ui/Button.jsx";
import { ComponentFade } from "../ui/ComponentFade.jsx";

export const BirdCard = ({ bird }) => {
    const { canAddToCart, addToCart } = useCart();
    const outOfStock = !canAddToCart(bird);

    return (
        <ComponentFade>
            <div className="p-6 h-screen mb-23">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border rounded-sm p-6 shadow-xl bg-white">

                    {/* Left: Image */}
                    <img
                        src={bird.image}
                        alt={bird.name}
                        className="w-full md:w-96 h-auto rounded-sm object-cover shadow-lg"
                    />

                    {/* Right: Info */}
                    <div className="flex flex-col justify-between w-full md:w-2/3">
                        <div className="space-y-1">
                            <h2 className="text-4xl font-extrabold">{bird.name}</h2>
                            <p className="text-gray-700">Material: {bird.material}</p>
                            <p className="text-gray-700">Size: {bird.size}</p>
                            <p className="text-gray-700">Price: {bird.price} kr</p>
                            <p className="text-gray-700">In stock: {bird.amount}</p>
                        </div>

                        {/* Button */}
                        <Button
                            disabled={outOfStock}
                            onClick={() => addToCart(bird, 1)}
                            className="mt-6 md:mt-8 text-base px-4 py-2 w-max"
                        >
                            {outOfStock ? "Sold out" : "Add to cart"}
                        </Button>
                    </div>
                </div>
            </div>
        </ComponentFade>
    );
};
