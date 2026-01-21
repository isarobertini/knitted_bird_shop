import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button.jsx";
import { useState, useEffect } from "react";

export const Footer = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkWidth = () => setIsMobile(window.innerWidth < 1024);
        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    return (
        <footer className="text-xs bg-amber-800 text-stone-300 px-4 py-1 mt-auto w-full">
            <div
                className={`flex ${isMobile ? "flex-col gap-6 items-center" : "flex-row justify-between items-center gap-6"}`}
            >
                {/* Left: Logo / tagline */}
                <div className={`${isMobile ? "text-center" : "text-left"}`}>
                    <h2 className="text-xl font-bold">Chicken Out</h2>
                    <p className="text-sm">Your favorite place for cluckin’ good vibes!</p>
                </div>

                {/* Middle: Quick links */}
                <div className={`flex ${isMobile ? "flex-col gap-2 items-center" : "flex-row gap-6 items-center"}`}>
                    <a href="/" className="hover:underline">Home</a>
                    <a href="/about" className="hover:underline">About Us</a>
                    <a href="/menu" className="hover:underline">Menu</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                    <a href="/faq" className="hover:underline">FAQ</a>
                </div>

                {/* Right: Register + social */}
                <div className={`flex ${isMobile ? "flex-col gap-4 items-center" : "flex-row gap-6 items-center"}`}>
                    <Button onClick={() => navigate("/login")}>Register</Button>
                    <div className="flex gap-4">
                        <a href="#" aria-label="Facebook">FB</a>
                        <a href="#" aria-label="Instagram">IG</a>
                        <a href="#" aria-label="Twitter">TW</a>
                    </div>
                </div>
            </div>

            {/* Bottom copyright */}
            <p className="mt-4 text-center text-xs">
                &copy; {new Date().getFullYear()} Chicken Out. All rights reserved. Not responsible for runaway chickens or cluck-ups.
            </p>
        </footer>
    );
};
