import {BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import Home from './components/Home'
import Welcome from './components/welcome/Welcome';
import Room from './components/video/Room';
import Profile from './components/profile/Profile';
import './static/stylesheets/App.css';
import Explore from './components/Explore';
import Stream from './components/Stream';

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/" render={() => <Welcome page='Login'/>}/>
                <Route exact path="/home" render={() => <Home/>}/>
                <Route exact path="/login" render={() => <Welcome page='Login'/>}/>
                <Route exact path="/register" render={() => <Welcome page='Registration'/>}/>
                <Route exact path="/video" render={() => <Room/>}/>
                <Route exact path="/profile/:id" render={(props) => <Profile profileId={props.match.params.id}/>}/>
                <Route exact path="/explore" render={() => <Explore/>}/>
                <Route exact path="/stream" render={() => <Stream />}/>
            </div>
        </Router>
    );
}


export default App;
