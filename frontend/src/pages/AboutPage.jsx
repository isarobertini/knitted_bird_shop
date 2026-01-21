import { useNavigate } from "react-router-dom";
import { Header } from "../ui/Header.jsx"
import { Button } from "../ui/Button.jsx";

export const AboutPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen px-4 py-8 md:px-12 md:py-12 max-w-5xl mx-auto">
            {/* Page title */}
            <Header className="text-amber-700 text-3xl md:text-4xl mb-6">
                About Our Knitted Chickens
            </Header>

            {/* Subtitle / tagline */}
            <p className="text-base md:text-lg mb-6">
                Welcome to Chicken Out! We’re all about handcrafted, cozy, knitted
                chickens that bring joy, charm, and a touch of whimsy to your home.
            </p>

            {/* Section: Our Story */}
            <section className="mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-amber-700 mb-2">
                    Our Story
                </h2>
                <p className="text-sm md:text-base">
                    Chicken Out started as a small passion project for handmade crafts.
                    Each knitted chicken is carefully crafted with love, attention to
                    detail, and a lot of imagination. From tiny chicks to decorative
                    friends, our creations are designed to make you smile.
                </p>
            </section>

            {/* Section: Our Mission */}
            <section className="mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-amber-700 mb-2">
                    Our Mission
                </h2>
                <p className="text-sm md:text-base">
                    Our mission is to share the joy of handmade crafts with the world.
                    We want every chicken to feel special, whether it’s for decoration,
                    gifting, or simply collecting. Knitting is our way of spreading
                    warmth, creativity, and a little bit of fun!
                </p>
            </section>

            {/* Section: Call-to-Action */}
            <section className="mb-6 text-center">
                <p className=" mb-4">
                    Want your own knitted chicken friend? Join our community!
                </p>
                <Button onClick={() => navigate("/login")}>Register now</Button>
            </section>
        </div>
    );
};