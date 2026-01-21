export const Button = ({
    children,
    onClick,
    type = "button",
    className = "",
    disabled = false,
}) => {
    const baseClasses =
        "py-2 px-4 my-4 rounded font-medium border border-black transform transition duration-200";

    const enabledClasses =
        "text-stone-300 bg-amber-800 hover:bg-stone-300 hover:text-amber-800 hover:scale-105";

    const disabledClasses =
        "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60";

    return (
        <button
            type={type}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses
                } ${className}`}
        >
            {children}
        </button>
    );
};
