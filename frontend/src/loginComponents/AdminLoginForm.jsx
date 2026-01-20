import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Spinner } from "../ui/Spinner.jsx";
import { ErrorMessage } from "../ui/ErrorMessage.jsx";

const BASE_URL = import.meta.env.VITE_API_URL;

export const AdminLoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, expectedRole: "admin" }),
            });
            const data = await res.json();
            if (!res.ok || !data.token) throw new Error(data.message || "Admin login failed");

            login(data.token, data.user);
            navigate("/admin");
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
            <h2 className="font-semibold">Admin Login</h2>
            <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button
                type="submit"
                className="bg-red-700 text-white py-2 rounded flex justify-center"
            >
                {loading ? <Spinner /> : "Login as Admin"}
            </button>
            {error && <ErrorMessage message={error} />}
        </form>
    );
};