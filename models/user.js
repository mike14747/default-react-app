const pool = require('../config/connectionPool.js').getDb();

const User = {
    getUserById: async (paramsObj = { id: null }) => {
        if (paramsObj.id === null) return [null, 'Incorrect parameters were received!'];
        try {
            const queryString = 'SELECT u.user_id, u.username, u.password FROM users AS u WHERE u.user_id=? LIMIT 1;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = User;
