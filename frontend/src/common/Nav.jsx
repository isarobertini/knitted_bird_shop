import { Link } from "react-router-dom";
import { Header } from "../ui/Header.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Button } from "../ui/Button.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useState, useEffect } from "react";

export const Nav = () => {
    const { user, logout } = useAuth();
    const { totalItems } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile/tablet
    useEffect(() => {
        const checkWidth = () => setIsMobile(window.innerWidth < 1024); // mobile + tablet
        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    return (
        <nav className="relative shadow-md text-amber-800 bg-stone-300">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

                {/* Logo + image */}
                <Link to="/" className="flex items-center gap-2 hover:text-black hover:underline">
                    <Header className="flex items-center gap-2">
                        Home
                        <img
                            src="https://img.icons8.com/?size=100&id=9207&format=png&color=000000"
                            alt="Logo"
                            className="w-10 h-10"
                        />
                    </Header>
                </Link>

                {/* Desktop menu */}
                {!isMobile && (
                    <div className="flex items-center gap-6">
                        <Link to="/about" className="hover:text-black hover:underline transition-colors duration-300">About us</Link>
                        <Link to="/contact" className="hover:text-black hover:underline transition-colors duration-300">Contact</Link>
                        {!user && <Link to="/login" className="hover:text-black hover:underline transition-colors duration-300">Login</Link>}

                        <div className="flex-grow"></div>

                        <div className="flex items-center gap-4">
                            <Link to="/cart" className="relative flex items-center hover:scale-105 transition-transform duration-200">
                                <img
                                    src="https://img.icons8.com/?size=100&id=ii6Lr4KivOiE&format=png&color=000000"
                                    alt="Cart"
                                    className="w-6 h-6"
                                />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>

                            {user && (
                                <div className="flex items-center gap-3">
                                    <span className="transition-opacity duration-300">Hi, {user.username}</span>
                                    <Button onClick={logout} className="">Logout</Button>
                                </div>
                            )}

                            {user?.role === "admin" && (
                                <Link to="/admin">
                                    <Button className="">Admin Dashboard</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}

                {/* Hamburger for mobile/tablet */}
                {isMobile && (
                    <button
                        className="text-3xl z-50 transition-transform duration-300 hover:scale-110"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                )}
            </div>

            {/* Mobile dropdown menu */}
            <div
                className={`
          md:hidden absolute top-full left-0 w-full text-amber-800 bg-stone-300 shadow-lg z-40
          transform transition-all duration-300 ease-out
          ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}
        `}
            >
                <div className="flex flex-col items-center gap-4 px-4 py-6">
                    <NavLinks
                        user={user}
                        logout={logout}
                        totalItems={totalItems}
                        closeMenu={() => setMenuOpen(false)}
                    />
                </div>
            </div>
        </nav>
    );
};

const NavLinks = ({ user, logout, totalItems, closeMenu }) => (
    <>
        <Link
            onClick={closeMenu}
            to="/about"
            className="hover:text-black hover:underline transition-colors duration-300"
        >
            About us
        </Link>
        <Link
            onClick={closeMenu}
            to="/contact"
            className="hover:text-black hover:underline transition-colors duration-300"
        >
            Contact
        </Link>
        {!user && (
            <Link
                onClick={closeMenu}
                to="/login"
                className="hover:text-black hover:underline  transition-colors duration-300"
            >
                Login
            </Link>
        )}
        <Link
            onClick={closeMenu}
            to="/cart"
            className="relative flex items-center hover:scale-105 transition-transform duration-200"
        >
            <img
                src="https://img.icons8.com/?size=100&id=ii6Lr4KivOiE&format=png&color=000000"
                alt="Cart"
                className="w-6 h-6"
            />
            {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {totalItems}
                </span>
            )}
        </Link>
        {user && (
            <>
                <span className="transition-opacity duration-300">Hi, {user.username}</span>
                <Button
                    onClick={() => { logout(); closeMenu?.(); }}
                >
                    Logout
                </Button>
            </>
        )}
        {user?.role === "admin" && (
            <Link
                onClick={closeMenu}
                to="/admin"
                className="transition-colors duration-300"
            >
                <Button >
                    Admin Dashboard
                </Button>
            </Link>
        )}
    </>
);
