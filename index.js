import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import api from "./src/api/index.js";
import mongooseInit from "./src/services/db/mongoose.js";

await mongooseInit();
mongoose.set("debug", true);

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(api);

app.listen(process.env.PORT || 3000, () => {
    console.log("App started on port " + process.env.PORT || 3000);
});
