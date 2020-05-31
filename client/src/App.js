import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                {/* There are 2 ways of writing routes and rendering components. Both methods are included here. */}
                {/* A 404 page is specified last to catch all non-existing routes. */}
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route exact path="/about" component={About} />
                    <Route path="/users"><Users /></Route>
                    <Route component={NoMatch} />
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

const NoMatch = () => {
    return (
        <div>
            <h2>Error 404!</h2>
            <p>An error has occurred.</p>
            <p>The page you are looking for does not exist!</p>
        </div>
    );
};

class Users extends Component {
    state = {
        usersArray: [],
    };

    componentDidMount() {
        axios.get('/api/users/1')
            .then(response => {
                this.setState({ usersArray: response.data });
            })
            .catch(error => {
                console.log('There has been an error.\n\n' + error);
            });
    }

    render() {
        return (
            <div>
                {this.state.usersArray && this.state.usersArray.length > 0 &&
                    this.state.usersArray.map(user => (
                        <div key={user.user_id}>
                            <p>User ID: {user.user_id}</p>
                            <p>Username: {user.username}</p>
                            <p>Password: {user.password}</p>
                        </div>
                    ))}
            </div>

        );
    }
}
