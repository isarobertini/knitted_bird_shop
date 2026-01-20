import { useState, useEffect } from "react";

export const useFetch = (fetchFunc, deps = []) => {
    const [data, setData] = useState(null);   // Store fetched data
    const [loading, setLoading] = useState(true); // Loading state for UI
    const [error, setError] = useState(null); // Store error message if fetch fails

    useEffect(() => {
        let cancelled = false; // Flag to prevent state updates if component unmounts
        setLoading(true);      // Set loading true at the start of fetch
        setError(null);        // Clear previous error

        // Execute the fetch function
        fetchFunc()
            .then(res => {
                if (!cancelled) setData(res); // Update data only if component is mounted
            })
            .catch(err => {
                if (!cancelled) setError(err.message); // Update error if fetch fails
            })
            .finally(() => {
                if (!cancelled) setLoading(false); // Done loading
            });

        // Cleanup function runs if component unmounts or deps change
        return () => { cancelled = true; };
    }, deps);

    // Return data, loading, and error to the consuming component
    return { data, loading, error };
};