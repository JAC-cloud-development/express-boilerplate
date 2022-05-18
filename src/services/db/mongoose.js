import mongoose from "mongoose";

export default async function init() {
    try {
        console.log("Connecting to mongoose...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongoose connected.");
    } catch (e) {
        console.log({ errorInitDB: e });
    }
}
