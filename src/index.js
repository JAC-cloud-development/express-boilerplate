import _ from 'lodash'
import express from "express";
import 'dotenv/config'

import api from './api/index.js';
import mongooseInit from './services/db/mongoose.js'

await mongooseInit()

const app = express();

// NECESSARIO PER LEGGERE IL BODY JSON IN POST E PUT
app.use(express.json());

app.use(api)

app.listen(3000, function () {
    console.log(
        "The server has started on port 3000. Head to localhost:3000 in the browser and see what's there!"
    );
});

app.use((err, req, res, next) => {
    console.log({ err })
    res.status(400).send(err)
})








//----------------------------------------------------------------------------------------------


//Import Mongoose
const mongoose = require("mongoose");
//Set URI
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mydbname";
//Store Connection Object
const db = mongoose.connection;
//Config Object to Avoid Deprecation Warnings
const config = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(URI, config);

//CONNECTION EVENTS
db.on("open", () => {
    console.log(`You are connected to Mongo`);
})
    .on("error", (err) => {
        console.log(err);
    })
    .on("close", () => {
        console.log(`You are no longer connected to Mongo`);
    });

module.exports = mongoose