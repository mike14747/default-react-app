// all these routes point to the /api folder as specified in server.js

const router = require('express').Router();

router.use('/', require('./testController'));

router.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

router.use((error, req, res, next) => {
    res.status(error.status || 500).send('An error occurred!\n' + error.message);
});

module.exports = router;
