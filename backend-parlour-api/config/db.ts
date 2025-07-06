import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const dbURI: string = process.env.MONGO_URI || "";
        await mongoose.connect(dbURI);
        console.log("MongoDB connected successfully");
    } catch (error: unknown) {
        console.error("Error connecting to MongoDB:", (error as Error).message);
        process.exit(1); // Exit the process with failure
    }
}