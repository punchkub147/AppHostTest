import React, { Component } from 'react';
import * as firebase from 'firebase';

class Login extends Component {

  state = {
    user: {}
  }

  handleSignIn = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this._email.value,this._password.value);

  }

  handleRegister = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this._emailRegister.value,this._passwordRegister.value)
    .then((res) => {
      console.log('register success', e)
    })
    .catch((e) => {
      console.log('register error', e.message)
    })
  }

  handleLogout = (e) => {
    e.preventDefault();
    console.log('CLICK LOGOUT BUTTON')
    firebase.auth().signOut();
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log('DID LOGIN')
        this.setState({
          user: firebaseUser,
        })
      }else{
        console.log('NOT LOGIN')
        this.setState({
          user: {},
        })
      }
    })
  }

  render () {
    
    return (
      <div id="Login">
        <form action="" onSubmit={this.handleSignIn}>
          <label htmlFor="">Login</label>
          <input type="text" placeholder="email" ref={input => this._email = input} />
          <input type="password" placeholder="password" ref={input => this._password = input} />
          <button type="submit" onSubmit={this.handleSignIn}> Log In </button>
        </form>
        <form action="" onSubmit={this.handleRegister}>
          <label htmlFor="">Register</label>
          <input type="text" placeholder="email" ref={input => this._emailRegister = input} />
          <input type="password" placeholder="password" ref={input => this._passwordRegister = input} />
          <button type="submit" onSubmit={this.handleRegister}> Sign Up </button>
        </form>
        <button onClick={this.handleLogout}> Log Out </button>
        {this.state.user.email}
      </div>
    );
  }
}

export default Login;
