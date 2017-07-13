import React, { Component } from 'react';

import cuid from 'cuid';
import _ from 'lodash';
import Map from '../components/Map';

import * as firebase from 'firebase';

class About extends Component {

  state = {
    users: {},
  }

  componentDidMount(){

  }

  render() {
    const { users, disabled } = this.state;

    return (
      <div id="About">
        <Map/>
      </div>
    );
  }
}

export default About;
