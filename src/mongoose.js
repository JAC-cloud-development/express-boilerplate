import mongoose from 'mongoose'

var Admin = mongoose.mongo.Admin;
const uri = "mongodb+srv://admin:1Nt9AvySWQOj6VFy@djrr-db.bdwoj.mongodb.net/?retryWrites=true&w=majority";


export default async function init() {

    try {
        console.log("Connecting to mongoose...")
        //const connection = await mongoose.connect(uri);
        console.log("Mongose connected.")

        /// create a connection to the DB    
        var connection = mongoose.createConnection(uri);
        connection.on('open', function () {
            // connection established
            new Admin(connection.db).listDatabases(function (err, result) {
                console.log('listDatabases succeeded');
                // database list stored in result.databases
                var allDatabases = result.databases;
                console.log(allDatabases)
            });
        });

    } catch (e) {
        console.error(e)
    }
}

init();