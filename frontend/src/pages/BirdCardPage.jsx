import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getJSON } from "../utils/Api.js";
import { BirdCard } from "../birds/BirdCard.jsx";
import { Spinner } from "../ui/Spinner.jsx";

export const BirdCardPage = () => {
    const { id } = useParams(); // fånga :id från URL
    const [bird, setBird] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getJSON(`${import.meta.env.VITE_API_URL}/birds/${id}`)
            .then(res => setBird(res.bird))
            .catch(err => {
                console.error(err);
                setBird(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Spinner />;
    if (!bird) return <p>Bird not found 🐦</p>;

    return (
        <div className="container mx-auto px-4 py-6">
            <BirdCard bird={bird} />
        </div>
    );
};