import FadeIn from 'react-fade-in';

export const Header = ({ children, className = "" }) => {
    return (
        <FadeIn>
            <h1 className={`" ${className}`}>
                {children}
            </h1>
        </FadeIn>
    );
};