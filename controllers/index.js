// this goes in controllers/index.js
// all these routes point to the /api folder as specified in server.js

const router = require('express').Router();
const path = require('path');

/*
const getController = require('./getController');
const postController = require('./postController');
const putController = require('./putController');
const deleteController = require('./deleteController');

router.use('/', getController);
router.use('/', postController);
router.use('/', putController);
router.use('/', deleteController);
*/

const testController = require('./testController');
router.use('/', testController);

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
