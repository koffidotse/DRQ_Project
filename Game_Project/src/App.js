import React, { Component } from 'react';
import './App.css';

import Header from './components/header/header';
import Home from './pages/home/home';
import GameList from './pages/gameList/gameList';
import Generate from './pages/generate/generate';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <br />
          <div className="switchContainer">
            <Switch>
              <Route path='/' component={Home} exact />
              <Route path='/generate' component={Generate} exact />
              <Route path='/gameList' component={GameList} exact />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
