import React, { Component } from 'react';
import Login from './Login';

class Topics extends Component {

  handleSignIn = (e) => {
    e.preventDefault();
    console.log(this._email.value,this._password.value)
  }

  render() {
    return (
      <div id="Topics">
        <h1>Topics AAA</h1>       

      </div>
    );
  }
}

export default Topics;
