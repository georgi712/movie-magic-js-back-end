import { Router } from 'express';
import movieService from '../services/movie-service.js';
import castService from '../services/cast-service.js';
import { isAuth } from '../middlewares/auth-middleware.js';
import { getErrorMessage } from '../utils/error-utils.js'

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
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

movieController.post('/create', isAuth, async (req, res) => {
    try {
        const newMovie = req.body;
        const userId = req.user?.id
        await movieService.create(newMovie, userId); 
        res.redirect('/');
    } catch (err) {
        const error = getErrorMessage(err)
        res.render('create', {error});
    }
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
        
    try {
        const movie = await movieService.getOneWithCast(movieId); 
        const isCreator = movie.creator?.toString() === req.user?.id;        
        res.render('movie/details', { movie, isCreator });        
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('404', {error})
    }
    
});

movieController.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId)

    const excludeIds = movie.casts.map(c => c.cast)

    const casts = await castService.getAll({exclude: excludeIds});
    res.render('movie/attach-cast', {movie, casts})
})
movieController.post('/:movieId/attach-cast', isAuth, async (req, res) => {
    const castId = req.body.cast;
    const character = req.body.character;
    const movieId = req.params.movieId;
    await movieService.attachCast(movieId, castId, character);

    res.redirect(`/movies/${movieId}/details`)
})
movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId
    const movie = await movieService.getOne(movieId)

    if (!movie.creator?.toString() === req.user?.id) {
        return res.redirect('/404')
    }

    await movieService.delete(movieId)
    res.redirect('/')
})

function getCategoriesViewData(category) {
    let categoriesMap = {
        'tv-show' : 'TV Show',
        'animation' : 'Animation',
        'movie' : 'Movie',
        'documentary' : 'Documentary',
        'short-film' : 'Short Film',
    }   

    const categories = Object.keys(categoriesMap).map(categoryValue => ({
        value: categoryValue, 
        label: categoriesMap[categoryValue],
        selected: categoryValue === category ? 'selected' : '',
    }));
    return categories;
}

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    const categories = getCategoriesViewData(movie.category)
    
    res.render('movie/edit', {movie, categories});
})

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;

    await movieService.update(movieId, movieData);

    res.redirect(`/movies/${movieId}/details`)
})

export default movieController;