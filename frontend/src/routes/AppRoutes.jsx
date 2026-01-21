import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "../ui/ScrollToTop.jsx";
import { MainLayout } from "../layouts/MainLayout.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { BirdCardPage } from "../pages/BirdCardPage.jsx";
import { CartPage } from "../pages/CartPage.jsx";
import { AboutPage } from "../pages/AboutPage.jsx";
import { ContactPage } from "../pages/ContactPage.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { AdminPage } from "../pages/AdminPage.jsx";
import { PageFade } from "../ui/PageFade.jsx";

export const AppRoutes = () => {
    return (
        <ScrollToTop>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<PageFade><HomePage /></PageFade>} />
                    <Route path="/birds/:id" element={<PageFade><BirdCardPage /></PageFade>} />
                    <Route path="/cart" element={<PageFade><CartPage /></PageFade>} />
                    <Route path="/about" element={<PageFade><AboutPage /></PageFade>} />
                    <Route path="/contact" element={<PageFade><ContactPage /></PageFade>} />
                    <Route path="/login" element={<PageFade><LoginPage /></PageFade>} />
                    <Route path="/admin" element={<PageFade><AdminPage /></PageFade>} />
                </Route>
            </Routes>
        </ScrollToTop>
    );
};
