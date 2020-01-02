const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    pseudo : {
        type: String, required: "Enter a pseudo ."
    },
    password: {
        type: String, required: "Enter a secured password."
    }
});

export const User = mongoose.model('User', userSchema);

User.checkPasswords = (plainTextPassword, hashPassword) => {
    return bcrypt.compareSync(plainTextPassword, hashPassword);
};
