import React, { Component } from 'react';
import * as firebase from 'firebase';
import { writeUserData } from '../api/firebase'

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

  handleSignIn = (e) => {
    e.preventDefault();
    this.setState({ disableLogin: true, })
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
    .then(() => {
      this.props.history.push('/')  
    })  
    
  }

  handleRegister = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.emailRegister,this.state.passwordRegister)
    .then((res) => {
      console.log('register success', res)
      writeUserData(res.uid,res.displayName,res.email,res.photoURL);
    })
    .catch((e) => {
      console.log('register error', e.message)
    })
  }

  handleLogout = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  handleFacebook = () => {
    console.log('facebook')
    var provider = new firebase.auth.FacebookAuthProvider();
    
    provider.addScope('public_profile');
    provider.addScope('email');
    provider.addScope('user_photos');
    
    // provider.setCustomParameters({
    //   'display': 'popup'
    // });
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;

      console.log('FACEBOOK RESULT',user)
      firebase.database().ref('users').child(user.uid).update({
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
      console.log('UPDATE')
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log('FACEBOOK ERROR', error)
    });
  }

  render () {

    const { user, disableLogin, disableLogout } = this.state
    
    return (
      <div id="Login">
        <Grid container justify={'center'} id="wrapper">
          <Grid item xs={12} sm={6} md={4} >
            <h3>LOGIN</h3>
            <button onClick={this.handleFacebook} style={{width: '100%', padding: 0}}>
              <Button raised color="accent" disabled={disableLogin} style={{width: '100%'}} >
                LOGIN WITH FACEBOOK
              </Button>
            </button>
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
              <button onSubmit={this.handleSignIn} style={{width: '100%', padding: 0}}>
                <Button raised color="accent" disabled={disableLogin} style={{width: '100%'}} >
                  Login
                </Button>
              </button>
            </form>
            <button onClick={this.handleLogout} style={{width: '100%', padding: 0}}>
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
              <button onSubmit={this.handleLogout} style={{width: '100%', padding: 0}}>
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
