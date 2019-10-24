require('dotenv').config();
const { PORT } = process.env;

const express = require('express');
const app = express();

app.get('/test', (req, res) => res.send('Hello World!'));

const controllers = require('./controllers');
app.use('/api', controllers);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server now listening on PORT ${PORT}!`);
});
