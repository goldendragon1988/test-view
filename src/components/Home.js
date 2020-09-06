import React, { Component } from 'react';

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        { !!user ? `Hi, ${user.first_name}` : "Please Login" }
      </div>
    );
  }
}

export default Home;
