import React, { Component } from 'react';

import axios from 'axios';

class Confirmation extends Component {

  componentDidMount() {
    const { match: { params }, handleLogin, history } = this.props;

    axios
      .post(
        'http://localhost:3001/api/v1/public/confirmations',
        {user: params}
      )
      .then( resp => {
        if(resp.status === 200) {
          const { data } = resp
          handleLogin(data, _ => history.push('/'))
        }
      })
      .catch( err => {
        console.error("err: ", err);
      })
  }

  renderConfirming() {
    return (
      <>
        Confirming... Please wait a moment.
        <br/>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  }

  render() {
    return this.renderConfirming()
  }

}

export default Confirmation;
