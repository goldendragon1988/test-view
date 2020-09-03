import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
  isLogin: false,
  user: {}
};

class App extends Component {
  state = initialState;

  componentDidMount() {
    this.checkLoginStatus()
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    const params = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios
      .get(
        'http://localhost:3001/api/v1/public/user_session',
        params
      )
      .then( resp => {
        if(resp.status === 200) {
          const { data } = resp
          this.handleLogin(data)
        }
      })
      .catch( err => {
        console.error("err: ", err);
      })
  }

  handleLogin = (data, callback = null) => {
    const {user, token} = data;

    if(!!token) localStorage.setItem("token", token)

    this.setState({user, isLogin: true}, _ => {
      if(!!callback) {
        callback();
      }
    })
  }

  handleLogout = () => {
    this.setState(initialState, _ => {
      localStorage.removeItem('token');
    })
  }

  render() {
    const { user, isLogin } = this.state;

    return (
      <div className="App">
        <Router>
          <Navigation
            isLogin={isLogin}
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
              path={"/reset_password/:id/:token"}
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
