import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Splash from './components/Splash';
import Home from './components/Home'
import Welcome from './components/Welcome'
import './static/stylesheets/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={() => <Welcome page='Login'  /> }/>
        <Route exact path="/home" render={() => <Home /> }/>
        <Route exact path="/login" render={() => <Welcome page='Login' /> }/>
        <Route exact path="/register" render={() => <Welcome page='Registration' /> }/>
      </div>
    </Router>
  );
}


export default App;

