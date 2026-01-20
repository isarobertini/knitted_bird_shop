import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
import { authFetch, getJSON } from "../utils/Api.js";

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    const { token, user } = useAuth();
    const [birds, setBirds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all birds
    const fetchBirds = async () => {
        if (!token) return; // not logged in
        setLoading(true);
        setError(null);
        try {
            const data = await getJSON(`${import.meta.env.VITE_API_URL}/birds`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Always fallback to empty array
            const fetchedBirds = data?.birds ?? [];
            setBirds(
                fetchedBirds.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )
            );
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBirds();
    }, [token]);

    // Post a new bird
    const postBird = async (formData) => {
        if (!token) throw new Error("You must be logged in");
        const res = await authFetch(`${import.meta.env.VITE_API_URL}/birds`, {
            method: "POST",
            body: formData,
        });
        return res;
    };

    // Delete a bird
    const deleteBird = async (birdId) => {
        if (!token) throw new Error("You must be logged in");
        const res = await authFetch(`${import.meta.env.VITE_API_URL}/birds/${birdId}`, {
            method: "DELETE",
        });
        // remove locally
        setBirds((prev) => prev.filter((b) => b._id !== birdId));
        return res;
    };

    // Update a bird
    const updateBird = async (birdId, updatedData) => {
        if (!token) throw new Error("You must be logged in");
        const res = await authFetch(`${import.meta.env.VITE_API_URL}/birds/${birdId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });
        // Refresh birds
        await fetchBirds();
        return res;
    };

    return (
        <AdminContext.Provider
            value={{
                birds,
                loading,
                error,
                fetchBirds,
                postBird,
                deleteBird,
                updateBird,
                isAdmin: user?.role === "admin",
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};