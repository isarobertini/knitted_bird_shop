import { Link } from "react-router-dom";
import { useFetch } from "../hooks/UseFetch.jsx";
import { getJSON } from "../utils/Api.js";
import { Spinner } from "../ui/Spinner.jsx";
import { ErrorMessage } from "../ui/ErrorMessage.jsx";

export const BirdList = () => {

    // Fetch birds data from the backend using the custom useFetch hook
    // useFetch returns data, loading state, and error if any
    const { data, loading, error } = useFetch(
        () => getJSON(`${import.meta.env.VITE_API_URL}/birds`),
        []
    );
    // Extract birds array from fetched data, fallback to empty array
    const birds = data?.birds || [];

    // Show loading spinner while fetching
    if (loading) return <Spinner />;
    // Show error message if fetching fails
    if (error) return <ErrorMessage message={error} />;
    // Show message if no birds are available
    if (!birds.length) return <p>No birds available</p>;


    return (
        <ul className="grid grid-cols-4 gap-0">
            {birds.map(bird => (
                <li key={bird._id} className="bg-stone-400 rounded-md m-3 p-4">
                    <Link to={`/birds/${bird._id}`}>
                        <img
                            src={bird.image}
                            alt={bird.name}
                            className="h-70 rounded-md w-full object-cover"
                        />
                        <h2 className="py-2 ">{bird.name}</h2>
                    </Link>

                    <p>{bird.price}kr</p>


                </li >
            ))}
        </ul >
    );
};