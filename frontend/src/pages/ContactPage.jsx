import { Header } from "../ui/Header.jsx"; // adjust path if needed
import { Button } from "../ui/Button.jsx";

export const ContactPage = () => {

    const sendContanctButton = async () => {
        alert("This function is not implemented yet. Please contact mi.robertini@gme.com for inquiries.");
    };

    return (
        <div className="px-4 py-8 md:px-12 md:py-12 max-w-3xl mx-auto">
            {/* Page title */}
            <Header className="text-3xl md:text-4xl text-amber-700 mb-6">
                Get in Touch
            </Header>

            {/* Subtitle / intro */}
            <p className="text-base md:text-lg mb-8">
                Have questions about our knitted chickens? Want to order a custom friend or just say hi?
                We’d love to hear from you!
            </p>

            {/* Contact form */}
            <form className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <textarea
                    placeholder="Your Message"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Button onClick={sendContanctButton} className="mt-2 mr-2">
                    Send Message
                </Button>
            </form>

            {/* Fun note */}
            <p className="text-gray-500 text-sm mt-6 text-center">
                We promise to reply before our knitted chickens start wandering off!
            </p>
        </div>
    );
};