import {BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import Home from './components/Home'
import Welcome from './components/welcome/Welcome';
import VideoChat from './components/video/VideoWrapper';
import Profile from './components/profile/Profile';
import './static/stylesheets/App.css';
import Explore from './components/Explore';
import Chat from './components/Chat';

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/" render={() => <Welcome page='Login'/>}/>
                <Route exact path="/home" render={() => <Home/>}/>
                <Route exact path="/login" render={() => <Welcome page='Login'/>}/>
                <Route exact path="/register" render={() => <Welcome page='Registration'/>}/>
                <Route exact path="/video" render={() => <VideoChat/>}/>
                <Route exact path="/profile/:id" render={(props) => <Profile profileId={props.match.params.id}/>}/>
                <Route exact path="/explore" render={() => <Explore/>}/>
                <Route exact path="/chat" render={() => <Chat/>}/>
            </div>
        </Router>
    );
}


export default App;
