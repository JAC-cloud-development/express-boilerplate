import mongoose from 'mongoose';

export default async function init() {
    try
    {
        console.log("Connecting to mongoose...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongose connected.");
    } catch (e) {
        console.error(e)
    }
}