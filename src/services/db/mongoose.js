import mongoose from 'mongoose';
import 'dotenv/config'
//MONGOOSE INITIALIZATION
export default async function init() {
    try {
        console.log("Connecting to mongoose...")
        //CONNECT DB from enviroment variables
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log("Mongose connected.")
    } catch (e) {
        //LOG ERRORS
        console.error(e)
    }
}