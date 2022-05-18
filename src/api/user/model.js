import mongoose from "mongoose";
import {
    checkPassword,
    hashPassword,
} from "../../services/passwordCrypt/index.js";

const userSchema = mongoose.Schema({
    name: { type: String, maxLength: 30, required: true },
    email: { type: String, maxLength: 50, required: true },
    password: { type: String, required: true },
    role:[{type:String, enum:["FrontEnd","BackEnd","Admin"]}],
    workOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkOrder" }],
},{timestamp:true});

userSchema.methods.checkPassword = function (password) {
    return checkPassword(password, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const { passwordToSave } = await hashPassword(this.password);
    this.password = passwordToSave;
    next();
});

export default mongoose.model("User", userSchema, "user");
