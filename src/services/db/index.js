import mongoose from 'mongoose';
import "dotenv/config";

export default async function init() {
    try {
        console.log("Connecting to mongoose...");
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Mongose connected.");
    } catch (e) {
        console.error(e);
    }
}