import User from "../models/User.js"
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";

const Secret = process.env.JWT_SECRET || "asasasasasas";

export default {
    async register(userData) {
        
        if (userData.password !== userData.rePassword) {
            throw new Error('Password mismatch!')
        }    
    
        const count = await User.countDocuments({ email: userData.email});

        if (count > 0) {
            throw new Error('Email alredy exists!');
        }

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