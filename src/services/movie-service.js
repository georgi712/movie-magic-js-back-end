import { v4 as uuid } from "uuid";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../config/database.json');

export default {
    async findOne(movieId) {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            const movies = JSON.parse(data || '[]'); // Fallback to an empty array if the file is empty
            return movies.find(movie => movie.id === movieId) || null; // Return `null` if not found
        } catch (err) {
            console.error("Error reading or parsing the movie data:", err);
            throw err; 
        }
    },

    async create(movieData) {
        const newId = uuid();

        try {
            const data = await fs.readFile(filePath, 'utf-8');
            const movies = JSON.parse(data || '[]');

            const newMovie = {
                id: newId,
                ...movieData,
                rating: Number(movieData.rating), 
            };

            movies.push(newMovie);

            await fs.writeFile(filePath, JSON.stringify(movies, null, 2));
            return newId; 
        } catch (err) {
            console.error("Error creating a new movie:", err);
            throw err; 
        }
    },

    async getAll(filter = {}) {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            const movies = JSON.parse(data || '[]');

            let result = movies;

            if (filter.search) {
                result = result.filter(movie =>
                    movie.title.toLowerCase().includes(filter.search.toLowerCase())
                );
            }
            if (filter.genre) {
                result = result.filter(movie =>
                    movie.genre.toLowerCase() === filter.genre.toLowerCase()
                );
            }
            if (filter.year) {
                result = result.filter(movie => movie.year == filter.year);
            }

            return result;
        } catch (err) {
            console.error("Error fetching movies:", err);
            throw err; 
        }
    }
};