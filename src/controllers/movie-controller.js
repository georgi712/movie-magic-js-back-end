import { Router } from 'express';
import movieService from '../services/movie-service.js';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/search', async (req, res) => {
    try {
        const filter = req.query;
        const movies = await movieService.getAll(filter); 
        res.render('search', { movies, filter });
    } catch (err) {
        console.error("Error searching for movies:", err);
        res.status(500).send("An error occurred while searching for movies.");
    }
});

movieController.post('/create', async (req, res) => {
    try {
        const newMovie = req.body;
        await movieService.create(newMovie); 
        res.redirect('/');
    } catch (err) {
        console.error("Error creating a new movie:", err);
        res.status(500).send("An error occurred while creating the movie.");
    }
});

movieController.get('/:movieId/details', async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const movie = await movieService.findOne(movieId); 

        if (!movie) {
            res.status(404).send("Movie not found.");
            return;
        }

        res.render('details', { movie });
    } catch (err) {
        console.error("Error fetching movie details:", err);
        res.status(500).send("An error occurred while fetching movie details.");
    }
});

export default movieController;