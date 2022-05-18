import mongoose from 'mongoose';
import itemsmodel from "../../api/commesse/model.js";
import usersmodel from "../../api/users/model.js";

export default async function init() {
    try {
        console.log("Connecting to mongoose...")
        await mongoose.connect(process.env.mongo ||  'mongodb+srv://admin:XgHqTMucpANwFywG@cluster0.hfpiq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
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

//mongosh "mongodb+srv://cluster0.hfpiq.mongodb.net/myFirstDatabase" --apiVersion 1 --username admin

//mongodb+srv://admin:XgHqTMucpANwFywG@cluster0.hfpiq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

/*
const defaults = {
    users: [{
        id: 1,
        username: "admin",
        password: "passwordSegreta"
    }]
};
*/