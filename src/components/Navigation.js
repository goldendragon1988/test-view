import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  renderAuthNav() {
    const { history, handleLogout } = this.props;
    return (
      <>
        <li className="nav-item">
          <Link
            className="nav-link"
            to={"/Dashboard"}
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to={"/"}
            onClick={ _ => handleLogout(_ => history.push('/')) }
          >
            Log Out
          </Link>
        </li>
      </>
    );
  }

  renderUnauthNav() {
    return (
      <>
        <li className="nav-item">
          <Link
            className="nav-link"
            to={"/registration"}
          >
            Registration
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to={"/sign_in"}
          >
            Sign In
          </Link>
        </li>
      </>
    );
  }
  render() {
    return (
      <ul className="nav">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={"/"}
          >
            Home
          </Link>
        </li>
        { !!this.props.user ?
            this.renderAuthNav() :
            this.renderUnauthNav()
        }
      </ul>
    );
  }
}

export default Navigation;
