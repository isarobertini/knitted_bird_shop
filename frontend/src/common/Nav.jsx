import { Link } from "react-router-dom";
import { Header } from "../ui/Header.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Button } from "../ui/Button.jsx";
import { useCart } from "../context/CartContext.jsx";

export const Nav = () => {
    const { user, logout } = useAuth();
    const { totalItems } = useCart();

    return (
        <nav className="shadow-md px-4 py-2 bg-stone-500 text-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <Header className="flex items-center gap-2">
                        Home
                        <img
                            src="https://img.icons8.com/?size=100&id=9207&format=png&color=000000"
                            alt="Logo"
                            className="w-10 h-10"
                        />
                    </Header>
                </Link>

                {/* Meny - alltid synlig */}
                <div className="flex items-center gap-6">
                    <Link to="/about" className="px-4 py-2 hover:text-red-700">
                        About us
                    </Link>
                    <Link to="/contact" className="px-4 py-2 hover:text-red-700">
                        Contact
                    </Link>
                    {!user && (
                        <Link to="/login" className="px-4 py-2 hover:text-red-700">
                            Login
                        </Link>
                    )}
                    <Link to="/cart" className="px-4 py-2 flex items-center relative">
                        <img
                            src="https://img.icons8.com/?size=100&id=ii6Lr4KivOiE&format=png&color=000000"
                            alt="Cart"
                            className="w-10 h-10"
                        />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {user && (
                        <div className="flex items-center gap-4">
                            <span>Hi, {user.username}</span>
                            <Button
                                onClick={logout}
                                className="bg-gray-500 text-white px-3 py-1 rounded"
                            >
                                Logout
                            </Button>
                        </div>
                    )}

                    {user?.role === "admin" && (
                        <Link to="/admin">
                            <Button className="bg-red-700 text-white px-3 py-1 rounded">
                                Admin Dashboard
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};