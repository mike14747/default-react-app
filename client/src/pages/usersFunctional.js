import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

const UsersFunctional = () => {
    const [state, setState] = useState({ usersArray: [] });

    useEffect(() => {
        axios.get('/api/users/1')
            .then(response => {
                setState({ usersArray: response.data });
            })
            .catch(error => {
                console.log('There has been an error.', error);
            });
    }, []);

    return (
        <Fragment>
            {state.usersArray && state.usersArray.length > 0 &&
                state.usersArray.map(user => (
                    <div key={user.user_id}>
                        <p>User ID: {user.user_id}</p>
                        <p>Username: {user.username}</p>
                        <p>Password: {user.password}</p>
                    </div>
                ))}
        </Fragment>
    );
};

export default UsersFunctional;
