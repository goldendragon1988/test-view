import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const initialState = {
  email: '',
  message: '',
  password: '',
};

class SignIn extends Component {
  state = initialState;

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      password,
    } = this.state;

    const {
      history,
      handleLogin
    } = this.props;

    const params = {
      user: {
        email,
        password,
      }
    }

    axios
      .post(
        'http://localhost:3001/api/v1/public/sessions',
        params,
        { withCredentials: true }
      )
      .then( resp => {
        if(resp.status === 200) {
          this.setState(initialState, _ => {
            const { data } = resp
            handleLogin(data, _ => history.push('/'))
          });
        }
      })
      .catch( err => {
        if(err) {
          this.setState({message: "Email or Password is incorrect"})
        }
      })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  renderMessage() {
    const { message } = this.state;
    return (
      <div className="alert alert-danger" role="alert">
        { message }
      </div>
    )
  }

  render() {
    const { message } = this.state;
    return (
      <div className="container">
        { !!message.length && this.renderMessage() }
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label >Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label >Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Sign In
          </button>
        </form>
        <Link
          to={"/recover_account"}
          className="nav-link mt-3 pl-0"
        >
          Forgot Password
        </Link>
      </div>
    );
  }
}

export default SignIn;
