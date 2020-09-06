import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const CLIENT_ID = '1039739740129-nbpokc5fnn7k4imqp6fa0os6emsn67rq.apps.googleusercontent.com'

const initialState = {
  email: '',
  message: '',
  password: '',
  googleReady: false,
};

class SignIn extends Component {
  state = initialState;
  componentDidMount() {
		window.gapi.load('auth2', _ => {this.setState({googleReady: true}) } )
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      password,
    } = this.state;

    const {
      history,
      handleLogin,
      axios
    } = this.props;

    const params = {
      user: {
        email,
        password,
      }
    }

    axios
      .post(
        'http://localhost:3001/users/sign_in',
        params
      )
      .then( resp => {
        if(resp.status === 200) {
          console.log(resp);
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

  onAuthorizeGoogle = () => {
    const {
      history,
      handleLogin,
      axios
    } = this.props;

    window.gapi.auth2.authorize({
      client_id: CLIENT_ID,
      cookie_policy: 'single_host_origin',
      scope: 'email profile',
      response_type: 'code'
    }, resp => {
      console.log("resp goog: ", resp)
      if (resp && !resp.error) {
        // google authentication succeed, now post data to server.
        axios
          .post(
            'http://localhost:3001/users/auth/google_oauth2/callback',
            resp,
            {
              headers: {
                'X-Requested-With': 'XMLHttpRequest'
              }
            }
          )
          .then( resp => {
            if(resp.status === 200) {
              console.log(resp);
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
      } else {
        // google authentication failed
      }
    });
  }

  render() {
    const { message, googleReady } = this.state;
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
        { googleReady && <button
          type="button"
          onClick={this.onAuthorizeGoogle}
          className="mt-4 btn btn-secondary"
        >
          Google Sign
        </button> }
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
