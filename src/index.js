import express from "express";
import api from './api/index.js';
import mongooseInit from './services/db/mongoose.js'
import 'dotenv/config'

// MONGOOSE INITIALIZATION
await mongooseInit()

const app = express();
// READ JSON BODY
app.use(express.json());

// USE API
app.use(api)

// APP LISTEN
app.listen(process.env.PORT, function () {
    console.log(
        "The server has started on port " + process.env.PORT
    );
});