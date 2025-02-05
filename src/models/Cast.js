import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'This field is required!'],
        minLength: [5, 'Minimum lenght is 5 character!'],
        match: [/^[a-zA-z0-9 ]+$/, 'Forbidden character!']
    },
    age: {
        type: Number,
        min: [0, 'Minimum age is 0!'],
        max: [120, 'Maximum age is 120!']
    },
    born: {
        type: String,
        required: [true, 'This field is required!'],
        minLength: [10, 'Minimum lenght is 10 character!'],
        match: [/^[a-zA-z0-9 ]+$/, 'Forbidden character!']
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'Invalid format!']
    },
})

const Cast = model('Cast', castSchema);
export default Cast;