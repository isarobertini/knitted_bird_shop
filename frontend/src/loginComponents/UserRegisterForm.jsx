import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../ui/Spinner.jsx";
import { ErrorMessage } from "../ui/ErrorMessage.jsx";
import { Button } from "../ui/Button.jsx";

const BASE_URL = import.meta.env.VITE_API_URL;

export const UserRegisterForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate(); // ✅ ADD THIS

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
            if (!res.ok || !data.token) {
                throw new Error(data.message || "Registration failed");
            }

            // ✅ Auto-login (already correct)
            login(data.token, data.user);

            // ✅ Feedback
            alert("Registration successful! You are now logged in.");

            // ✅ Redirect
            navigate("/");

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleRegister}
            className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl flex flex-col gap-4"
        >
            <h2 className="font-semibold text-xl">Shopper Registration</h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <Button type="submit" className="flex justify-center">
                {loading ? <Spinner /> : "Register & Login"}
            </Button>

            {error && <ErrorMessage message={error} />}
        </form>
    );
};
