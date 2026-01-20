import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create a context to hold authentication state
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // State for storing JWT token and user info
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    // On initial load, read token and user info from localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(savedUser);
        }
    }, []);

    // Log in the user: save token and user info to state and localStorage
    const login = (token, user) => {
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    };

    // Log out the user: confirm first, then clear state and localStorage
    const logout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return; // stop if user cancels

        // Do NOT clear cart
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/"); // redirect to home
    };

    // Provide auth state and actions to the app
    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for consuming authentication state
export const useAuth = () => useContext(AuthContext);