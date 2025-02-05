import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'This field is required!'],
        minLength: 1,
        match: /^[a-zA-z0-9 ]+$/
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
        minLength: 5,
        match: /^[a-zA-z0-9 ]+$/
    },
    director: {
        type: String,
        minLength: 5,
        match: /^[a-zA-z0-9 ]+$/
    },
    year: {
        type: Number,
        min: 1900,
        max: 2025
    },
    imageUrl: {
        type: String,
        match: /^https?:\/\//
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        minLength: 20,
        match: /^[a-zA-z0-9 ]+$/
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