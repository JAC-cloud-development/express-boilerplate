import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new mongoose.Schema({
    email: { type: String,
        trim: true,
        lowercase: true,
        unique: [true, "Email is required"],
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address']
    },
    name: { type: String,
        lowercase: true,
        required: 'Name is required'
    },
    password: { type: String, required: "password is required" },
    role: [{type: String,
         required: "role is required", 
         enum: ["Frontend", "Backend","teamLeader", "prodcutOwner", "Grafico","Admin","Manager"]}],
    job: [{type: mongoose.ObjectId}]
}, {timestamps: true});

userSchema.pre("save", function (next){
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, hash)=>{
        if (err){
            return next(err);
        }
        user.password = hash;
        next();
    });
});

export default mongoose.model('User', userSchema);