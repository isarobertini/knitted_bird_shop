import FadeIn from 'react-fade-in';
import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "../utils/ScrollToTop.jsx";
import { MainLayout } from "../layouts/MainLayout.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { BirdCardPage } from "../pages/BirdCardPage.jsx";
import { CartPage } from "../pages/CartPage.jsx";
import { AboutPage } from "../pages/AboutPage.jsx";
import { ContactPage } from "../pages/ContactPage.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { AdminPage } from "../pages/AdminPage.jsx";

export const AppRoutes = () => {
    return (
        <ScrollToTop>
            <FadeIn>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/birds/:id" element={<BirdCardPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                    </Route>
                </Routes>
            </FadeIn>
        </ScrollToTop>
    );
};