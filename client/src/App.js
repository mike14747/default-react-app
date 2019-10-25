import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

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

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
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

class Users extends Component {
    state = {
        usersArray: [],
    };

    componentDidMount() {
        fetch('/api/users/1')
            .then(response => response.json())
            .then(data => {
                this.setState({ usersArray: data });
            })
            .catch(error => {
                console.log('There has been an error.\n\n' + error);
            });
    }

    render() {
        return (
            <div>
                {this.state.usersArray.map(user => (
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
