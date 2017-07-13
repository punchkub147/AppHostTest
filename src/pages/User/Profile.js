import React, { Component } from 'react';
import * as firebase from 'firebase';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

class Login extends Component {

  state = {
    user: {},
    disableEdit: false,
    disableLogout: false,
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

  handleEdit = (e) => {
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
    firebase.auth().signOut();
    this.props.history.push('/') //redirect route
  }

  render () {
    const { disableEdit, disableLogout, user } = this.state
    
    return (
      <div id="Login">
        <Grid container justify={'center'} id="wrapper">
          <Grid item xs={12} sm={6} md={4} >
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
              <button onSubmit={this.handleEdit} style={{width: '100%', padding: 0}}>
                <Button raised color="accent" disabled={disableEdit} style={{width: '100%'}} >
                  EDIT
                </Button>
              </button>
            </form>
            <button onClick={this.handleLogout} style={{width: '100%', padding: 0, position: 'relative', bottom: 0}}>
              <Button raised color="accent" disabled={disableLogout} style={{width: '100%'}} >
                LOGOUT
              </Button>
            </button>
            {user.email}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
