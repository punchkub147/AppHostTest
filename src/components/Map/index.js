import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import styled from 'styled-components';
import * as firebase from 'firebase'
import { setUserLocation } from '../../api/firebase'
import moment from 'moment'

import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
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
    },
    openSnackbar: false,
  }
  
  componentDidMount(){
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        this.setState({
          user: firebaseUser,
        })
        this.initMap()
      }else{
        this.setState({openSnackbar: true})
        //this.props.history.push('/login')
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
          label: {
            text: 'HERE',
            color: "#eb3a44",
            fontSize: "16px",
            fontWeight: "bold"
          },
          animation: google.maps.Animation.DROP,
          icon: {
            url: 'http://www.flaticon.com/premium-icon/icons/svg/186/186250.svg',
            scale: 10,
            size: new google.maps.Size(40, 40),
            scaledSize: new google.maps.Size(40, 40),
          }
        });

        firebase.database().ref('users').on('child_added',snapshot => {
          console.log('SNAPSHOTAAAAA',snapshot.val())
          //const label = snapshot.val().displayName;
          if (user.uid !== snapshot.key){
            const user = snapshot.val();
            const lat = snapshot.val().location.lat;
            const lng = snapshot.val().location.lng;
            this.addMarker({lat, lng}, user, map )
          }
          
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
  addMarker = (position, user, map) => {
    console.log('DATA USER',user)

    const marker = new google.maps.Marker({
      position,
      icon: { 
        url: user.photoURL,
        size: new google.maps.Size(40, 40),
        scaledSize: new google.maps.Size(40, 40),
        //origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 20),
        
      },
      shape: {
        coords:[17,17,18],
        type: 'circle',
      },
      map,
    });

    const time = moment(user.updateLocationTime).fromNow()
    marker.info = new google.maps.InfoWindow({
      content: '<div><b>'+user.displayName+'</b><br/>'+time+'</div>'
    });

    google.maps.event.addListener(marker, 'click', function() {
      marker.info.open(map, marker);
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

    return (
      <div id="Map">
        <Container>
          <div ref={c => this.map = c} style={mapStyle}></div>
        </Container>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnackbar}
          //autoHideDuration={6e3}
          onRequestClose={() => this.setState({openSnackbar: true})}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Please Login</span>}
          action={[
            <Button key="undo" color="accent" dense onClick={() => this.props.history.push('/login')}>
              LOGIN
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => this.setState({openSnackbar: true})}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default Map;
