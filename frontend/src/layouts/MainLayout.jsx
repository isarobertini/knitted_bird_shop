import { Outlet } from "react-router-dom";
import { Header } from "../ui/Header.jsx";
import { Nav } from "../common/Nav.jsx";
import { Footer } from "../common/Footer.jsx";

export const MainLayout = () => {
    return (
        <div className="flex flex-col bg-stone-300 font-stretch-60%">
            <Header />
            <Nav />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};