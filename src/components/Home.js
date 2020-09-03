import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        Hi, {this.props.user.first_name}
      </div>
    );
  }
}

export default Home;
