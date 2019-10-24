const router = require('express').Router();
const db = require('../models/index.js');

// all these routes point to the /api folder as specified in server.js
router.route('/').get((req, res) => {
    res.status(200).send('Sending this from the /api route root!');
});

router.get('/users/:id', (req, res) => {
    db.User.getUserById(req.params.id, (data) => {
        res.json(data);
    });
});

module.exports = router;
