import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import styled from 'styled-components';
import * as firebase from 'firebase'
import { setUserLocation } from '../../api/firebase'

/* global google */

//const GOOGLE_API_KEY = 'AIzaSyASX7Jx6lyf7Q_Ok8RIowJQGAbEbVB8LMU';

const Container = styled.div`
  height: 92vh;
`;

const mapStyle = {
  height: '100%',
  width: '100%',
  position: 'fixed',
};

class Map extends Component {

  state = {
    user:{},
    userPos: {
      lat: 0,
      lng: 0,
    }
  }
  
  componentDidMount(){
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        this.setState({
          user: firebaseUser,
        })
        this.initMap()
      }else{
        this.setState({
          user: {
            uid: ''
          },
        })
      }
    })
  }

  initMap = () => {
    //const position = {lat: 13.795108, lng: 100.5447481};
    const infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        const location = {lat: position.coords.latitude,lng: position.coords.longitude}

        const { user } = this.state;
        setUserLocation(user.uid,location)

        const map = new google.maps.Map(this.map, {
          zoom: 15,
          center: location,
          fullscreenControl: true,
          disableDefaultUI: true
        });

        const marker = new google.maps.Marker({
          map: map,
          position: location,
          label: 'คุณอยู่ที่นี่',
          animation: google.maps.Animation.DROP,
        });

        firebase.database().ref('users').on('child_added',snapshot => {
          console.log('SNAPSHOT',snapshot.val())
          const label = snapshot.val().email;
          const lat = snapshot.val().location.lat;
          const lng = snapshot.val().location.lng;
          this.addMarker({lat, lng}, label, map )
        })
      })
    }
    //const position = this.state.userPos;

    
    // const infoWindow = new google.maps.InfoWindow;
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.setState({
    //       userPos: {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //       }
    //     }) 
    //     const pos = this.state.userPos
    //     //console.log('POSITION',this.state.userPos)
    //     infoWindow.setPosition(pos);
    //     this.addMarker(pos, map);
    //     infoWindow.open(map);
    //     map.setCenter(pos);
    //   }, function() {
    //     //this.handleLocationError(true, infoWindow, map.getCenter());
    //     console.log('Error 1')
    //     infoWindow.setPosition(map.getCenter());
    //     infoWindow.open(map);
    //   });
    // } else {
    //   //this.handleLocationError(false, infoWindow, map.getCenter());
    //   console.log('Error 2')
    //   infoWindow.setPosition(map.getCenter());
    //   infoWindow.open(map);
    // }
  }
  addMarker = (position, label, map) => {
    console.log('POS',position)
    var marker = new google.maps.Marker({
      position,
      label,
      map,
    });
  }
  // handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
  //   infoWindow.setPosition(pos);
  //   infoWindow.setContent(browserHasGeolocation ?
  //                         'Error: The Geolocation service failed.' :
  //                         'Error: Your browser doesn\'t support geolocation.');
  //   infoWindow.open(map);
  // }

  render() {
    console.log('STATE',this.state)
    
    return (
      <div id="Map">
        <Container>
          <div ref={c => this.map = c} style={mapStyle}></div>
        </Container>
      </div>
    );
  }
}

export default Map;
