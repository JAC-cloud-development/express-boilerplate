import mongoose from "mongoose";

const workOrderSchema = mongoose.Schema({
    name: { type: String, maxLength: 30, required: true },
    startedAt:{type:Date},
    finishAt:{type:Date},
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},{timestamp:true});

export default mongoose.model("WorkOrder", workOrderSchema, "workorder");
