import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
  password: '',
  passwordConfirmation: '',
  message: '',
};

class ResetPassword extends Component {
  state = initialState;

  handleSubmit = (e) => {
    e.preventDefault();
    const { password, passwordConfirmation } = this.state;

    if(password !== passwordConfirmation) {
      return this.setState({message: "Please check the password"})
    }

    const { match: { params: {token} }, handleLogin, history } = this.props;
    const user= {
      password,
      password_confirmation: passwordConfirmation,
      reset_password_token: token
    }

    axios
      .put(
        'http://localhost:3001/users/password',
        {
          user
        }
      )
      .then( resp => {
        console.log("resp: ", resp);
        if(resp.status === 200) {
          const { data } = resp
          handleLogin(data, _ => history.push('/'))
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
      password,
      passwordConfirmation,
      message,
    } = this.state;

    return (
      <div className="container">
        { !!message.length && this.renderMessage() }
        <form onSubmit={this.handleSubmit}>
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
            Reset Password
          </button>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
