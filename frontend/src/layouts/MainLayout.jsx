import { Outlet } from "react-router-dom";
import { Header } from "../ui/Header.jsx";
import { Nav } from "../common/Nav.jsx";
import { Footer } from "../common/Footer.jsx";

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-stone-500 flex flex-col font-stretch-60%">
            <Header />
            <Nav />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};