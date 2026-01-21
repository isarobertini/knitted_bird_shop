import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { Link } from "react-router-dom";
import { Spinner } from "../ui/Spinner.jsx";
import { ErrorMessage } from "../ui/ErrorMessage.jsx";
import { RequireAdmin } from "./RequireAdmin.jsx";
import { useAdmin } from "../context/AdminContext.jsx";

export const PostedBirdList = () => {
    const { birds, loading, error, deleteBird, updateBird } = useAdmin();

    const [editingBirdId, setEditingBirdId] = useState(null);
    const [editForm, setEditForm] = useState({});

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

    const cancelEditing = () => {
        setEditingBirdId(null);
        setEditForm({});
    };

    const saveEdit = async (birdId) => {
        const confirmed = window.confirm("Save changes to this bird?");
        if (!confirmed) return;

        try {
            await updateBird(birdId, editForm);
            cancelEditing();
        } catch (err) {
            alert("Failed to update bird");
            console.error(err);
        }
    };


    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!birds.length) return <p className="text-center py-8">No birds found</p>;

    return (
        <RequireAdmin>
            <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 text-amber-800 px-4 md:px-12 py-12">
                {birds.map((bird) => (
                    <li
                        key={bird._id}
                        className="p-3 border border-black rounded-sm flex flex-col"
                    >
                        {/* Bird preview */}
                        <Link to={`/birds/${bird._id}`}>
                            <img
                                src={bird.image}
                                alt={bird.name}
                                className="w-full rounded-sm h-48 object-cover"
                            />
                            <h2 className="mt-2">{bird.name}</h2>
                        </Link>

                        <p className="font-bold">{bird.price}kr</p>
                        <p className="text-sm">Stock: {bird.amount}</p>

                        {/* Edit form */}
                        {editingBirdId === bird._id ? (
                            <div className="flex flex-col gap-2 mt-3">
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
                                        placeholder={field}
                                        className="border border-black rounded-sm px-2 py-1 text-sm"
                                    />
                                ))}
                                <div className="flex gap-2">
                                    <Button onClick={() => saveEdit(bird._id)}>Save</Button>
                                    <Button onClick={cancelEditing}>Cancel</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-2 mt-auto pt-3">
                                <Button
                                    onClick={() => {
                                        const confirmed = window.confirm("Are you sure you want to delete this bird?");
                                        if (confirmed) {
                                            deleteBird(bird._id);
                                        }
                                    }}
                                >
                                    Delete bird
                                </Button>
                                <Button onClick={() => startEditing(bird)}>
                                    Edit bird
                                </Button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </RequireAdmin>
    );
};
