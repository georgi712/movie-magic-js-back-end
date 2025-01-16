import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('It works!')
})

app.listen(port, () => {
    console.log('App is running on http://localhost:3000...');
})