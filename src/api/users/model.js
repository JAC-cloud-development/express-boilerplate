import mongoose from 'mongoose'
import { checkPassword, hashPassword } from '../../services/passwordCrypt/index.js'
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 6
    },
    passwordsalt: { type: String },
    password: {
        type: String,
        required: true
    },
    commesse: {type: Array}
    
});

userSchema.methods.checkPassword = function (password) {
    return checkPassword(password, this.password, this.passwordsalt)
}

userSchema.pre('save', function (next) {
    const { passwordToSave, salt } = hashPassword(this.password);
    this.password = passwordToSave;
    this.passwordsalt = salt;
    next();
})

export default mongoose.model('User', userSchema);