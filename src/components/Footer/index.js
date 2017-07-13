import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import PropTypes from 'prop-types';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import FolderIcon from 'material-ui-icons/Folder';

import _ from 'lodash';

class AppFooter extends Component {

  render() {

    let pathname = this.props.location.pathname;

    if( pathname === '/') pathname = 0
    if( pathname === '/about') pathname = 1
    if( pathname === '/topics') pathname = 2

    return (
      <div id="Footer">
      {
        // <div className="foot-height"></div>
        //   <BottomNavigation className="foot" index={pathname} onChange={this.handleChange}>
        //     <Link to="/"><BottomNavigationButton label="Recents" icon={<RestoreIcon />} /></Link>
        //     <Link to="/about"><BottomNavigationButton label="Favorites" icon={<FavoriteIcon />} /></Link>
        //     <Link to="/topics"><BottomNavigationButton label="Nearby" icon={<LocationOnIcon />} /></Link>
        //   </BottomNavigation>
      
        // <Menu
        //     selectedKeys={[this.props.location.pathname]}
        //     mode="horizontal"
        //   >
        //     <Menu.Item key="/">
        //       <Link to="/">Home</Link>
        //     </Menu.Item>
        //     <Menu.Item key="/about">
        //       <Link to="/about">About</Link>
        //     </Menu.Item>
        //     <Menu.Item key="/topics">
        //       <Link to="/topics">Topics</Link>
        //     </Menu.Item>
        //   </Menu>
        // <div >
        //   <BottomNavigation index={index} onChange={this.handleChange}>
        //     <BottomNavigationButton label="Recents" icon={<RestoreIcon />} />
        //     <BottomNavigationButton label="Favorites" icon={<FavoriteIcon />} />
        //     <BottomNavigationButton label="Nearby" icon={<LocationOnIcon />} />
        //     <BottomNavigationButton label="Folder" icon={<FolderIcon />} />
        //   </BottomNavigation>
        // </div>
      }
      </div>
    );
  }
}

export default AppFooter;
