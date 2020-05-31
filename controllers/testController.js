const router = require('express').Router();
const User = require('../models/user');

router.get('/users/:id', async (req, res, next) => {
    const paramsObj = {
        id: req.params.id,
    };
    try {
        const data = await User.getUserById(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
