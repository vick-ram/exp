import mongoose from "mongoose";

const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/exp_db";

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database: ", error);
        process.exit(1);
    }
}

export default connectDB;