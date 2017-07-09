import React, { Component } from 'react';
import * as firebase from 'firebase';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

class Login extends Component {

  state = {
    user: {},
    email: '',
    password: '',
    emailRegister: '',
    passwordRegister: '',
    disableLogin: false,
    disableLogout: false,
  }

  handleSignIn = (e) => {
    e.preventDefault();
    this.setState({ disableLogin: true, })
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)    
  }

  handleRegister = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.emailRegister,this.state.passwordRegister)
    .then((res) => {
      console.log('register success', e)
    })
    .catch((e) => {
      console.log('register error', e.message)
    })
  }

  handleLogout = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log('DID LOGIN')
        this.setState({
          user: firebaseUser,
          disableLogin: true,
          disableLogout: false,
        })
      }else{
        console.log('NOT LOGIN')
        this.setState({
          user: {},
          disableLogin: false,
          disableLogout: true,
        })
      }
    })
  }

  render () {

    const { user, disableLogin, disableLogout } = this.state
    
    return (
      <div id="Login">
        <Grid container gutter={0} justify={'center'}>
          <Grid item xs={10} sm={6} md={4} >
            <h3>LOGIN</h3>
            <form action="" onSubmit={this.handleSignIn}>
              <TextField
                id="email"
                label="Email"
                onChange={e => this.setState({ email: e.target.value })}
                fullWidth
                marginForm
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
                fullWidth
                marginForm
              />
              <button onSubmit={this.handleSignIn} style={{width: '100%'}}>
                <Button raised color="accent" disabled={disableLogin} style={{width: '100%'}} >
                  Login
                </Button>
              </button>
            </form>
            <button onClick={this.handleLogout} style={{width: '100%'}}>
              <Button raised color="accent" disabled={disableLogout} style={{width: '100%'}} >
                LOGOUT
              </Button>
            </button>
            
            <h3>REGISTER</h3>
            <form action="" onSubmit={this.handleRegister}>
              <TextField
                id="email"
                label="Email"
                onChange={e => this.setState({ emailRegister: e.target.value })}
                fullWidth
                marginForm
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                onChange={e => this.setState({ passwordRegister: e.target.value })}
                fullWidth
                marginForm
              />
              <button onSubmit={this.handleLogout} style={{width: '100%'}}>
                <Button raised color="accent" style={{width: '100%'}} >
                  Register
                </Button>
              </button>
            </form>
            {user.email}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
