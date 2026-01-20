import { PostBirdForm } from "../postBirdsComponents/PostBirdForm.jsx";
import { PostedBirdList } from "../postBirdsComponents/PostedBirdsList.jsx";
import { AdminProvider } from "../context/AdminContext.jsx";

export const AdminPage = () => {
    return (
        <AdminProvider>
            <div>
                <PostBirdForm />
                <PostedBirdList />
            </div>
        </AdminProvider>
    );
};