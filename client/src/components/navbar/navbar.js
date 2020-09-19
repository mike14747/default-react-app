import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/users1">Users (class component)</Link>
            </li>
            <li>
                <Link to="/users2">Users (functional component)</Link>
            </li>
        </ul>
    );
};

export default Navbar;
