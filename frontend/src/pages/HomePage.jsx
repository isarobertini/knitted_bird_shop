import Marquee from "react-fast-marquee";
import { BirdList } from "../birds/BirdList.jsx";
import { Header } from "../ui/Header.jsx";
import { ComponentFade } from "../ui/ComponentFade.jsx";

export const HomePage = () => {
    return (
        <div className="">
            {/* Hero Banner */}
            <header className="w-full h-screen bg-[url('https://images.unsplash.com/photo-1667333639007-618dd5353d0b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center flex flex-col items-center justify-center text-center">

                {/* Main title */}
                <Header className="text-5xl text-amber-800 mb-4 italic font-stretch-150% font-serif">
                    Chicken Out
                </Header>

                {/* Slogan under title */}
                <h2 className="text-2xl text-amber-800 font-medium italic font-serif px-4 py-2 rounded">
                    Or don't... Get your home knitted chicken now!
                </h2>

            </header>
            <Marquee className="text-stone-300 bg-amber-800 p-4">
                Discover a world of handmade charm with our adorable knitted chickens. Each one is carefully crafted with love and attention to detail, perfect for adding a touch of whimsy to your home, gifting to a loved one, or collecting as part of your cozy décor. Soft, unique, and full of personality — our chickens are more than just toys, they’re tiny bundles of joy.
            </Marquee>

            {/* Main content */}
            <ComponentFade>
                <div className="mx-6 my-10">
                    <BirdList />
                </div>
            </ComponentFade>

        </div>
    );
};