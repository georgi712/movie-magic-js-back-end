import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';
import showRaitingHelper from './helpers/ratingHelper.js';
import mongoose from 'mongoose';
import 'dotenv/config';

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

app.use(routes);

app.listen(port, () => {
    console.log('App is running on http://localhost:3000...');
})