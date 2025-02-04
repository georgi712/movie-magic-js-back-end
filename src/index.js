import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config'; 

import routes from './routes.js';
import showRaitingHelper from './helpers/ratingHelper.js';
import { authMiddleware } from './middlewares/auth-middleware.js';

const app = express();
const port = 3000;

try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('Conected sucessfuly!');
} catch (err) {
    console.error(err);
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        showRating: showRaitingHelper,
    },

}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authMiddleware);

app.use(routes);

app.listen(port, () => {
    console.log('App is running on http://localhost:3000...');
})
console.log('TODO: isAuth');