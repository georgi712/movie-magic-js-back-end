import User from "../models/User.js"
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";

const Secret = process.env.JWT_SECRET || "asasasasasas";

export default {
    register(userData) {
        return User.create(userData);
    },
    async login(email, password) {
        const user = await User.findOne({email});
        if(!user) {
            throw new Error('Invalid email or password!');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid email or password!');
        }
        const payload = {
            id: user.id,
            email: user.email,
        }
        const token = jwt.sign(payload, Secret, {expiresIn: '2h'});
        return token;
    }
}