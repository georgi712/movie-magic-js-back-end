import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'This field is required!'],
        minLength: 5,
        match: /^[a-zA-z0-9 ]+$/
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    born: {
        type: String,
        required: [true, 'This field is required!'],
        minLength: 10,
        match: /^[a-zA-z0-9 ]+$/
    },
    imageUrl: {
        type: String,
        match: /^https?:\/\//
    },
})

const Cast = model('Cast', castSchema);
export default Cast;