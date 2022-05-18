import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  surname: {type: String, required: true},
  password: {type: String, required: true},
  role: {type:  String, required: true, enum:["admin", "guest"]}
});

export default mongoose.model("User", userSchema);