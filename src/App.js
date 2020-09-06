import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Registration from './components/Registration';
import Confirmation from './components/Confirmation';
import SignIn from './components/SignIn';
import Navigation from './components/Navigation';
import RecoverAccount from './components/RecoverAccount';
import ResetPassword from './components/ResetPassword';

import './App.scss';

const initialState = {
  user: null
};

class App extends Component {
  state = initialState;

  componentDidMount() {
    axios.defaults.withCredentials = true;
    this.checkLoginStatus()
  }

  checkLoginStatus() {
    axios
      .get(
        'http://localhost:3001/signed_in'
      )
      .then( resp => {
        console.log("resp: ", resp);
        if(resp.status === 200) {
          this.handleLogin(resp.data)
        }
      })
      .catch( err => {
        console.error("err: ", err);
      })
  }

  handleLogin = (user , callback = null) => {
    this.setState({user}, _ => {
      if(!!callback) {
        callback();
      }
    })
  }

  handleLogout = () => {
    axios
      .delete(
        'http://localhost:3001/users/sign_out',
      )
      .then( resp => {
        console.log("resp: ", resp)
        if(resp.status === 200) {
          this.setState(initialState, _ => {
            return <Redirect to={"/"} />
          })
        }
      })
      .catch( err => {
        console.error("err: ", err);
      })
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <Router>
          <Navigation
            user={user}
            handleLogout={this.handleLogout}
          />
          <Switch>
            <Route
              exact
              path={"/"}
              render={ props => (
                <Home
                  user={user}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={"/recover_account"}
              render={ props => (
                <RecoverAccount
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={"/reset_password/:token"}
              render={ props => (
                <ResetPassword
                  handleLogin={this.handleLogin}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={"/dashboard"}
              component={Dashboard}
            />
            <Route
              exact
              path={"/registration"}
              render={ props => (
                <Registration
                  handleLogin={this.handleLogin}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={"/confirmation/:id/:token"}
              render={ props => (
                <Confirmation
                  handleLogin={this.handleLogin}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={"/sign_in"}
              render={ props => (
                <SignIn
                  handleLogin={this.handleLogin}
                  axios={axios}
                  {...props}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
