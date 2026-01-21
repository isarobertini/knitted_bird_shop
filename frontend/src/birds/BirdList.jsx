import { Link } from "react-router-dom";
import { useFetch } from "../hooks/UseFetch.jsx";
import { getJSON } from "../utils/Api.js";
import { Spinner } from "../ui/Spinner.jsx";
import { ErrorMessage } from "../ui/ErrorMessage.jsx";

export const BirdList = () => {
    const { data, loading, error } = useFetch(
        () => getJSON(`${import.meta.env.VITE_API_URL}/birds`),
        []
    );
    const birds = data?.birds || [];

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!birds.length) return <p>No birds available</p>;

    return (
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 text-amber-800">
            {birds.map(bird => (
                <li key={bird._id} className="p-3 border border-1 border-black rounded-sm">
                    <Link to={`/birds/${bird._id}`}>
                        <img
                            src={bird.image}
                            alt={bird.name}
                            className="w-full rounded-sm h-48 object-cover"
                        />
                        <h2 className="mt-2">{bird.name}</h2>
                    </Link>
                    <p className="font-bold">{bird.price}kr</p>
                </li>
            ))}
        </ul>
    );
};
