import mongoose from 'mongoose';
import itemsmodel from "../../api/commesse/model.js";
import usersmodel from "../../api/users/model.js";
//require('dotenv').config()
import 'dotenv/config'

export default async function init() {
    try {
        console.log("Connecting to mongoose...")
        await mongoose.connect(process.env.mongo);
        console.log("Mongose connected.")//sembra funzionare
                                        // nome db myFirstDatabase
    } catch (e) {
        console.error(e)
    }

    /*const user = new usersmodel({
         username: 'admin',
         password: "passwordSegreta",

        });
    
        await user.save();

    console.log(user);*/ // 'Silence'
}

/*
const defaults = {
    users: [{
        id: 1,
        username: "admin",
        password: "passwordSegreta"
    }]
};
*/