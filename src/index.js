import _ from 'lodash'
import express from "express";
import api from './api/index.js';
import cors from "cors";
import mongooseInit from './services/db/index.js';
import "dotenv/config";

await mongooseInit();

const app = express();

app.use(express.json());

app.use(cors(), api);
app.use(express.urlencoded({extended: false}));

app.listen(process.env.PORT || 3000, function () {
    console.log(
        "The server has started"
    );
});