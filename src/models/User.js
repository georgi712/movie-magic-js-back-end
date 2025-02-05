import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    email: {
        type: String, 
        unique: true,
        match: [/\@[a-zA-z]+.[a-zA-Z]+$/, 'Invalid format!'],
        minLength: [10, 'Minimum lenght is 10 character!'],
    },
    password: {
        type: String,
        match: [/^[a-zA-z0-9 ]+$/, 'Forbidden character!'],
        minLength: [6, 'Minimum lenght is 6 character!'],
        trim: true
    },
})

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
})

const User = model('User', userSchema);
export default User;