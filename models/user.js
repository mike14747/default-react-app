const connection = require('../config/connection');

const User = {
    getUserById: (id, cb) => {
        const queryString = 'SELECT u.user_id, u.username, u.password FROM users AS u WHERE u.user_id=? LIMIT 1;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
};

module.exports = User;
