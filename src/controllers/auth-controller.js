import { Router } from 'express';
import authService from '../services/auth-service.js';

const authController = Router();

const Secret = process.env.JWT_SECRET || "asasasasasas"; 
authController.get('/register', (req, res) => {
    res.render('auth/register')
});

authController.post('/register', async (req, res) => {
    const userData = req.body;
    authService.register(userData)
    res.redirect('/auth/login');
});

authController.get('/login', (req, res) => {
    res.render('auth/login');
})

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token, {httpOnly: true});    
        return res.redirect('/');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/404');
    }
})

authController.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/')
})

export default authController