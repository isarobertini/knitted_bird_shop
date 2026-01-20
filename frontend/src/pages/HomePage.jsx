import { BirdList } from "../birds/BirdList.jsx";
import { Header } from "../ui/Header.jsx";

export const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Banner */}
            <header className="w-full h-screen bg-[url('https://images.unsplash.com/photo-1667333639007-618dd5353d0b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center flex flex-col items-center justify-center text-center">

                {/* Main title */}
                <Header className="text-5xl text-white mb-4 italic font-stretch-150% font-serif">
                    Chicken Out
                </Header>

                {/* Slogan under title */}
                <h2 className="text-2xl text-white font-medium italic font-serif px-4 py-2 rounded">
                    Or don't... Get your home knitted chicken now!
                </h2>

            </header>

            {/* Main content */}
            <div className="container mx-auto px-4 py-8">
                <BirdList />
            </div>
        </div>
    );
};