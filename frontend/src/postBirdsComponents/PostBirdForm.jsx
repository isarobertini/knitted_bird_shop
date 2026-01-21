import { useState } from "react";
import { Spinner } from "../ui/Spinner.jsx";
import { ErrorMessage } from "../ui/ErrorMessage.jsx";
import { RequireAdmin } from "./RequireAdmin.jsx";
import { useAdmin } from "../context/AdminContext.jsx";
import { Button } from "../ui/Button.jsx";

export const PostBirdForm = () => {
    // Access admin functions from AdminContext
    const { postBird, fetchBirds } = useAdmin();

    // Form state: holds all the input values for a new bird
    const [form, setForm] = useState({
        name: "",
        size: "",
        material: "",
        amount: "",
        price: "",
        description: "",
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle changes to inputs and file input
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    };

    // Reset form back to initial empty values
    const resetForm = () =>
        setForm({
            name: "",
            size: "",
            material: "",
            amount: "",
            price: "",
            description: "",
            image: null,
        });

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Require an image before submitting
        if (!form.image) return setError("Please select an image");
        // Reset messages and show loading spinner
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Prepare FormData for file upload
        const formData = new FormData();
        Object.entries(form).forEach(([k, v]) => formData.append(k, v));

        try {
            // Send POST request to add a new bird
            await postBird(formData);
            setSuccess("Bird added successfully!");
            resetForm();
            fetchBirds(); // refresh list
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RequireAdmin>
            <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-4">Add New Bird</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {["name", "size", "material", "amount", "price"].map((field) => (
                        <input
                            key={field}
                            type={["size", "amount", "price"].includes(field) ? "number" : "text"}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            name={field}
                            value={form[field]}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    ))}
                    <textarea
                        placeholder="Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input type="file" name="image" accept="image/*" onChange={handleChange} required />
                    <Button
                        type="submit"
                        disabled={loading}
                        className=""
                    >
                        {loading ? <Spinner /> : "Add Bird"}
                    </Button>
                    {error && <ErrorMessage message={error} />}
                    {success && <p className="text-green-700 mt-2">{success}</p>}
                </form>
            </div>
        </RequireAdmin>
    );
};