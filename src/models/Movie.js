import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'This field is required!'],
        minLength: [1, 'Minimum lenght is 1 character!'],
        match: [/^[a-zA-z0-9 ]+$/, 'Forbidden character!']
    },
    category: {
        type: String,
        enum: [
            'tv-show',
            'animation',
            'movie',
            'documentary',
            'short-film'
        ]
    },
    genre: {
        type: String,
        required: [true, 'This field is required!'],
        minLength: [5, 'Minimum lenght is 5 character!'],
        match: [/^[a-zA-z0-9 ]+$/, 'Forbidden character!']
    },
    director: {
        type: String,
        minLength: [5, 'Minimum lenght is 5 character!'],
        match: [/^[a-zA-z0-9 ]+$/, 'Forbidden character!']
    },
    year: {
        type: Number,
        min: [1900, 'Minimum year 1900!'],
        max: [2025, 'Maximum year 2025!']
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'Invalid format!']
    },
    rating: {
        type: Number,
        min: [1, 'Min rating 1!'],
        max: [5, 'Max rating 5!'],
    },
    description: {
        type: String,
        minLength: [20, 'Minimum lenght is 20 character!'],
        match: [/^[a-zA-z0-9 ]+$/, 'Forbidden character!']
    },
    casts: [{
        _id: false,
        character: String,
        cast: {
            type: Types.ObjectId,
            ref: 'Cast'    
        },
    }],
    creator: [{
        type: Types.ObjectId,
        ref: 'User'
    }]
})

const Movie = model('Movie', movieSchema);

export default Movie;