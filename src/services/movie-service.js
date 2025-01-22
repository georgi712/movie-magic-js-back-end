import { v4 as uuid } from "uuid";
import Movie from "../models/Movie.js";

export default {
    async getOne(movieId) {
        const result = Movie.findById(movieId);
        return result;
    },

    async create(movieData) {
        const newId = uuid();

        try {
            

            const newMovie = {
                id: newId,
                ...movieData,
                rating: Number(movieData.rating), 
            };

            

            return newId; 
        } catch (err) {
            console.error("Error creating a new movie:", err);
            throw err; 
        }
    },

    getAll(filter = {}) {
            let query = Movie.find({});

            if (filter.search) {
                query = query.where({title: filter.search});
            }
            if (filter.genre) {
                query = query.where({genre: filter.genre})
            }
            if (filter.year) {
                query = query.where({year: Number(filter.year)})
            }

            return query;
    }
};