export const Header = ({ children, className = "" }) => {
    return (
        <h1 className={`" ${className}`}>
            {children}
        </h1>
    );
};