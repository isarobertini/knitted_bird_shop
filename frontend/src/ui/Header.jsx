import { ComponentFade } from "./ComponentFade";

export const Header = ({ children, className = "" }) => {
    return (
        <ComponentFade>
            <h1 className={`" ${className}`}>
                {children}
            </h1>
        </ComponentFade>
    );
};