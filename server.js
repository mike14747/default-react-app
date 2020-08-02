require('dotenv').config();
const PORT = process.env.PORT || 3001;

const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connectionPool = require('./config/connectionPool');

connectionPool.mysqlConnect()
    .then(() => {
        app.use('/api', require('./controllers'));
    })
    .catch((error) => {
        console.log('An error occurred connecting to the database!\n', error.message);
        app.get('/api/*', (req, res) => {
            res.status(500).send('There is no connection to the database!');
        });
    })
    .finally(() => {
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static('./client/build'));
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, './client/build/index.html'));
            });
        }
    });

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});
