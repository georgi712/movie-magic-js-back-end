import { Router } from "express";
import movieService from "../services/movie-service.js";


const router = Router();

router.get('/', async (req, res) => {
    try {
        const movies = await movieService.getAll();
        console.log(movies);
        res.render('home', { movies });
    } catch (err) {
        console.error("Error fetching movies:", err);
        res.status(500).send("An error occurred while fetching movies.");
    }
});
router.get('/about', (req, res) => {
    res.render('about');
})

export default router;