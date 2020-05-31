import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './css/my_style.css';
import './css/style.css';
import Header from './components/header/header';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './pages/home/home';

export default function App() {
    return (
        <Router>
            <div className="container border bg-white">
                <Header />
                <Navbar />
                {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                {/* There are 2 ways of writing routes and rendering components. Both methods are included here. */}
                {/* A 404 page is specified last to catch all non-existing routes. */}
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route exact path="/about" component={About} />
                    <Route path="/users"><Users /></Route>
                    <Route component={NoMatch} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

function About() {
    return <h2>About</h2>;
}

const NoMatch = () => {
    return (
        <div>
            <h3 className="text-danger mb-4">Error 404!</h3>
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
