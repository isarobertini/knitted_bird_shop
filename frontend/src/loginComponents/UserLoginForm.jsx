import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Spinner } from "../ui/Spinner.jsx";
import { ErrorMessage } from "../ui/ErrorMessage.jsx";
import { Button } from "../ui/Button.jsx";

const BASE_URL = import.meta.env.VITE_API_URL;

export const UserLoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, expectedRole: "user" }),
            });
            const data = await res.json();
            if (!res.ok || !data.token) throw new Error(data.message || "Login failed");

            login(data.token, data.user);
            navigate("/"); // shopper home
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl flex flex-col gap-4"
        >
            <h2 className="font-semibold text-xl">Shopper Login</h2>

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

            <Button
                type="submit"
                className="bg-amber-800 text-stone-200 hover:bg-stone-200 hover:text-amber-800 transition-colors duration-200 py-2 rounded-md flex justify-center"
            >
                {loading ? <Spinner /> : "Login"}
            </Button>

            {error && <ErrorMessage message={error} />}
        </form>
    );
};
