import {BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import Home from './components/Home'
import Welcome from './components/welcome/Welcome';
import Lobby from './components/video/Lobby';
import Profile from './components/profile/Profile';
import './static/stylesheets/App.css';
import Explore from './components/Explore';

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/" render={() => <Welcome page='Login'/>}/>
                <Route exact path="/home" render={() => <Home/>}/>
                <Route exact path="/login" render={() => <Welcome page='Login'/>}/>
                <Route exact path="/register" render={() => <Welcome page='Registration'/>}/>
                <Route exact path="/video" render={() => <Lobby/>}/>
                <Route exact path="/profile" render={() => <Profile/>}/>
                <Route exact path="/explore" render={() => <Explore/>}/>
            </div>
        </Router>
    );
}


export default App;
