import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
  fistName: '',
  lastName: '',
  email: '',
  message: '',
  password: '',
  passwordConfirmation: '',
};

class Registration extends Component {
  state = initialState;

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation
    } = this.state;

    if(password !== passwordConfirmation) {
      return console.error("Password Error");
    }

    const { handleLogin, history } = this.props;

    const params = {
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: password
      }
    }

		axios.defaults.xsrfCookieName = "CSRF-TOKEN";
		axios.defaults.xsrfHeaderName = "X-CSRF-Token";
		axios.defaults.withCredentials = true;

    axios
      .post(
        'http://localhost:3001/users',
        params
      )
      .then( resp => {
        console.log("resp: ", resp);
        if(resp.status === 200) {
          this.setState({...initialState, message: "Successfully Created a User"},
            _ => handleLogin(resp.data, _ => history.push('/'))
          );
        }
      })
      .catch( err => {
        console.error("err: ", err);
      })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  renderMessage() {
    const { message } = this.state;
    return (
      <div className="alert alert-success" role="alert">
        { message }
      </div>
    )
  }


  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      message
    } = this.state;
    return (
      <div className="container">
        { !!message.length && this.renderMessage() }
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label >First Name</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              name="firstName"
              placeholder="First Name"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label >Last Name</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              name="lastName"
              placeholder="Last Name"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label >Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
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
              value={password}
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label >Password Confirmation</label>
            <input
              type="password"
              className="form-control"
              value={passwordConfirmation}
              name="passwordConfirmation"
              placeholder="Password Confirmation"
              onChange={this.handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Registration;
