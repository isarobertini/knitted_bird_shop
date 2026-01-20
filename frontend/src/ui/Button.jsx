export const Button = ({ children, onClick, type = "button", className = "" }) => {
    // Base styling applied to all buttons
    const baseClasses =
        "py-2 px-4 my-4 rounded text-white font-medium bg-cyan-700 transform transition duration-200 hover:scale-105";

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${className}`} // allow extra classes if needed
        >
            {children}
        </button>
    );
};