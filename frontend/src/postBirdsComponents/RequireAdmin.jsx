import { useAuth } from "../context/AuthContext.jsx";

export const RequireAdmin = ({ children }) => {
    const { user } = useAuth();
    if (!user || user.role !== "admin") {
        return <p className="text-center text-red-500 mt-8">Access denied — admins only</p>;
    }
    return children;
};