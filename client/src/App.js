import {BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import Home from './components/Home'
import Welcome from './components/welcome/Welcome'
import Room from './components/video/Room'
import Profile from './components/profile/Profile'
import './static/stylesheets/App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/" render={() => <Welcome page='Login'/>}/>
                <Route exact path="/home" render={() => <Home/>}/>
                <Route exact path="/login" render={() => <Welcome page='Login'/>}/>
                <Route exact path="/register" render={() => <Welcome page='Registration'/>}/>
                <Route exact path="/video" render={() => <Room/>}/>
                <Route exact path="/profile" render={() => <Profile/>}/>
            </div>
        </Router>
    );
}


export default App;

