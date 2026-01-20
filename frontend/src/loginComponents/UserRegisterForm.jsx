import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Spinner } from "../ui/Spinner.jsx";
import { ErrorMessage } from "../ui/ErrorMessage.jsx";

const BASE_URL = import.meta.env.VITE_API_URL;

export const UserRegisterForm = () => {
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await res.json();
            if (!res.ok || !data.token) throw new Error(data.message || "Registration failed");

            login(data.token, data.user);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <h2 className="font-semibold">Shopper Registration</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
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
                className="bg-green-700 text-white py-2 rounded flex justify-center"
            >
                {loading ? <Spinner /> : "Register & Login"}
            </button>
            {error && <ErrorMessage message={error} />}
        </form>
    );
};