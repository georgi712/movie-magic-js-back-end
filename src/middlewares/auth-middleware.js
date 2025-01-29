import jwt from 'jsonwebtoken';

const Secret = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();        
    }

    try {
        const decodedToken = jwt.verify(token, Secret);
        req.user = decodedToken;
        next();
    } catch (err) {
        
    }

}