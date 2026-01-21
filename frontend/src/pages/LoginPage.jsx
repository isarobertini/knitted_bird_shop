import { useState } from "react";
import { UserLoginForm } from "../loginComponents/UserLoginForm.jsx";
import { UserRegisterForm } from "../loginComponents/UserRegisterForm.jsx";
import { AdminLoginForm } from "../loginComponents/AdminLoginForm.jsx";

export const LoginPage = () => {
    const [view, setView] = useState("user"); // "user" or "admin"

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md space-y-6">
                {view === "user" ? (
                    <>
                        <UserLoginForm />
                        <UserRegisterForm />
                    </>
                ) : (
                    <AdminLoginForm />
                )}

                <button
                    className="underline text-blue-700 mt-4"
                    onClick={() => setView(view === "user" ? "admin" : "user")}
                >
                    {view === "user" ? "Login as Admin" : "Back to Shopper Login"}
                </button>
            </div>
        </div>
    );
};
