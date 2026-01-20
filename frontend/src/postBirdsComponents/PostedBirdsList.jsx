import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { Link } from "react-router-dom";
import { Spinner } from "../ui/Spinner.jsx";
import { ErrorMessage } from "../ui/ErrorMessage.jsx";
import { RequireAdmin } from "./RequireAdmin.jsx";
import { useAdmin } from "../context/AdminContext.jsx";

export const PostedBirdList = () => {
    // Access admin data and actions from AdminContext
    const { birds, loading, error, deleteBird, updateBird } = useAdmin();

    // Track currently editing bird and its form state
    const [editingBirdId, setEditingBirdId] = useState(null);
    const [editForm, setEditForm] = useState({});

    // Start editing a bird: populate the edit form with current bird data
    const startEditing = (bird) => {
        setEditingBirdId(bird._id);
        setEditForm({
            name: bird.name,
            price: bird.price,
            amount: bird.amount,
            material: bird.material || "",
            size: bird.size || "",
        });
    };

    // Cancel editing and reset form
    const cancelEditing = () => {
        setEditingBirdId(null);
        setEditForm({});
    };

    // Save edits by calling admin context update function
    const saveEdit = async (birdId) => {
        try {
            await updateBird(birdId, editForm); // Update backend
            cancelEditing(); // Reset editing state
        } catch (err) {
            alert("Failed to update bird");
            console.error(err);
        }
    };

    // Show spinner or error message if data is loading or failed
    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!birds.length) return <p className="text-center py-8">No birds found</p>;

    return (
        // Only accessible to admin users
        <RequireAdmin>
            <div className="px-4 md:px-12">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {birds.map((bird) => (
                        <li key={bird._id}>
                            <div className="rounded-md p-4 flex flex-col items-center border border-gray-200">

                                {/* Bird preview with link */}
                                <Link
                                    to={`/birds/${bird._id}`}
                                    className="w-full text-center hover:underline"
                                >
                                    <img
                                        className="rounded-md object-cover w-full h-48 mb-3"
                                        src={bird.image}
                                        alt={bird.name}
                                    />
                                    <h2 className="font-medium text-lg mb-2">{bird.name}</h2>
                                    <div className="text-sm text-gray-700 space-y-1 mb-4">
                                        <p>Price: {bird.price}kr</p>
                                        <p>Stock: {bird.amount}</p>
                                    </div>
                                </Link>

                                {/* Edit form for selected bird */}
                                {editingBirdId === bird._id ? (
                                    <div className="flex flex-col gap-2 w-full">
                                        {["name", "price", "amount", "material", "size"].map((field) => (
                                            <input
                                                key={field}
                                                type={["price", "amount", "size"].includes(field) ? "number" : "text"}
                                                value={editForm[field]}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        [field]: ["price", "amount", "size"].includes(field)
                                                            ? Number(e.target.value)
                                                            : e.target.value,
                                                    })
                                                }
                                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                                className="border px-2 py-1 rounded"
                                            />
                                        ))}
                                        <div className="flex gap-2 mt-2">
                                            <Button onClick={() => saveEdit(bird._id)}>Save</Button>
                                            <Button variant="secondary" onClick={cancelEditing}>Cancel</Button>
                                        </div>
                                    </div>
                                ) : (
                                    // Actions for non-editing state
                                    <div className="flex gap-2 mt-2">
                                        <Button onClick={() => deleteBird(bird._id)}>Delete bird</Button>
                                        <Button variant="secondary" onClick={() => startEditing(bird)}>Edit bird</Button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </RequireAdmin>
    );
};