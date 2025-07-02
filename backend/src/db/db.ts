import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export function connectDB() {
    try {
        if (process.env.MONGO_URI) {
            mongoose.connect(process.env.MONGO_URI);
            console.log("connected to db");
        } else {
            console.log("mongo connection string not set");
        }
    } catch (error) {
        console.log("error in connecting to db", error);
    }
}
