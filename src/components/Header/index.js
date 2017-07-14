import React, { Component } from 'react';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

//import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Avatar from 'material-ui/Avatar';
//import Icon from 'material-ui/Icon';
import ChevronLeft from 'material-ui-icons/ChevronLeft';

import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
//import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
//import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
//import MailIcon from 'material-ui-icons/Mail';
//import DeleteIcon from 'material-ui-icons/Delete';
//import ReportIcon from 'material-ui-icons/Report';


class AppHeader extends Component {

  state = {
    user: {},
    openMenu: false,
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        this.setState({
          user: firebaseUser,
        })
      }else{
        this.setState({
          user: {},
        })
      }
    })
  }

  handleLogout = (e) => {
    e.preventDefault();
    console.log('CLICK LOGOUT BUTTON')
    firebase.auth().signOut();
  }

  render() {

    const { user } = this.state;
    const { match } = this.props;


    return (
      <div id="Header">
        <AppBar position="static" className="head" >
          <Toolbar>
            {(match.url === '/item/create' || match.url === '/item/edit/' ) ?
              (
                <IconButton color="contrast" aria-label="Menu" onClick={() => this.props.history.push('/')}>
                  <ChevronLeft/>
                </IconButton>
              ):(
                <IconButton color="contrast" aria-label="Menu" onClick={() => this.setState({openMenu: true})}>
                  <MenuIcon/>
                </IconButton>
              )
            }
            
            <Typography type="title" color="inherit" style={{flex: 1}}>
              {match.url}
            </Typography>
            
            {_.isEmpty(user) ?
              (
              <Link to="/login" >
                <Button color="contrast">
                  LOGIN
                </Button>
              </Link>
              ):(
              <Link to="/user/profile" >
                <Avatar alt="Remy Sharp" src={user.photoURL} />
              </Link>
              )
            }
          </Toolbar>
        </AppBar>

        <div className="head-height"></div>  

        <Drawer
          open={this.state.openMenu}
          onRequestClose={() => this.setState({openMenu: false})}
          onClick={() => this.setState({openMenu: false})}
        >
          <List disablePadding style={{width: '250px', 'text-decoration': 'none'}}>
            <Link to="/">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to="/about">
              <ListItem button>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </Link>
            <Link to="/topics">
              <ListItem button>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Topics" />
              </ListItem>
            </Link>
          </List>
        </Drawer>            
      </div>
    );
  }
}

export default AppHeader;
