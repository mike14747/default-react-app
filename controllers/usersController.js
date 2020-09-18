const router = require('express').Router();
const User = require('../models/user');

router.get('/:id', async (req, res, next) => {
    try {
        const paramsObj = {
            id: req.params.id,
        };
        const [data, error] = await User.getUserById(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
