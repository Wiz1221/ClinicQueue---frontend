import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Home from "../Home/Home";
import AccountPage from "../AccountPage/AccountPage";
import Login from "../Login/Login";
import Error from '../Error/Error';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/account"  component={AccountPage}/>
            <Route exact path="/login" component={Login}/>
            <Route component={Error}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
