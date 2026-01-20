import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { UserModel } from "../models/userModel.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        const existingAdmin = await UserModel.findOne({ role: "admin" });
        if (existingAdmin) {
            console.log("⚠️ Admin already exists:", existingAdmin.email);
            return;
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        const admin = new UserModel({
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin"
        });

        const savedAdmin = await admin.save();
        console.log("✅ Admin created:", savedAdmin.email);
    } catch (err) {
        console.error("❌ Error creating admin:", err);
    } finally {
        await mongoose.disconnect();
    }
};

// Only run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    createAdmin().then(() => process.exit(0));
}