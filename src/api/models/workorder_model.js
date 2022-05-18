import mongoose from "mongoose";

const workorderSchema = new mongoose.Schema({
    user_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    task_ID:{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true}
});

export default mongoose.model("workorder", workorderSchema);