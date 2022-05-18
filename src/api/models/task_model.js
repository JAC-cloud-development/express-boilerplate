import mongoose from "mongoose";

//task: ID, name, description, status, expire_date, date_creation
// date_creation -> automatically set on TODAY
// expire_date -> format 2022-05-18T14:13:42.466Z
const taskSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  task_status: {type: String, required: true, enum: ["accessible", "progess", "completed"]},
  date_creation: {type: Date, default: Date.now},
  expire_date: {type: Date, required: true}
});

export default mongoose.model("Task", taskSchema);