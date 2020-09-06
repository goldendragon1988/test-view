import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
  email: '',
  message: '',
};

class RecoverAccount extends Component {
  state = initialState;

  handleSubmit = (e) => {
    e.preventDefault();

    const params = {
      user: {
        email: this.state.email
      }
    }

    axios
      .post(
        'http://localhost:3001/users/password',
        params,
      )
      .then( resp => {
        console.log("resp: ", resp);
        if(resp.status === 200) {
          this.setState({...initialState, message: "Please check your email"}, _ => {
          });
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
      email,
      message,
    } = this.state;

    return (
      <div className="container">
        { !!message.length && this.renderMessage() }
        <form onSubmit={this.handleSubmit}>
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
          <button
            type="submit"
            className="btn btn-primary"
          >
            Recover Account
          </button>
        </form>
      </div>
    );
  }
}

export default RecoverAccount;
