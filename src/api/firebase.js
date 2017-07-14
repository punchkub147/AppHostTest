import * as firebase from 'firebase';
import moment from 'moment';
import _ from 'lodash';

var config = {
  apiKey: "AIzaSyAAX51sxYIlv5DHhMI46dLvUYydK2lWAiY",
  authDomain: "sparking-d3380.firebaseapp.com",
  databaseURL: "https://sparking-d3380.firebaseio.com",
  projectId: "sparking-d3380",
  storageBucket: "sparking-d3380.appspot.com",
  messagingSenderId: "473975625968"
};
firebase.initializeApp(config);

export const db = firebase.database()
export const storage = firebase.storage()

export const getItemWithOwner = async () => {
  const items = await db.ref('items').on('value');
  console.log('items', items)
  // db.ref('items').on('value', snapItems => {
  //   let items = [];
  //   const data =_.map(snapItems.val(), (snapItem) => {
  //     return db.ref('users').child(snapItem.val().userId).on('value', user => {
  //       items.push(_.extend(snapItem.val(), {user: user.val()}))
  //       console.log('GET ITEMS',items)
  //       return items
  //     })
  //   });
  //   console.log('snapItems',data);
  // })

  // return db.ref('users').once('value').then(function(snapshot) {
  //   return snapshot.val();
  // }) 
}

export const writeUserData = (userId, username, email, profile_picture) => {
  firebase.database().ref('users/' + userId).set({
    username,
    email,
    profile_picture,
  });
}

export const deleteOnValue = (ref,key,value) => {
  db.ref(ref).orderByChild(key).equalTo(value).on('value',snapshot => {
    snapshot.forEach(snap => {
      db.ref(ref).child(snap.key).remove()
    })
  });
}

export const setUserLocation = (userId,location) => {
  firebase.database().ref('users').child(userId).update({
    location,
    updateLocationTime: moment().format(),
  })
}

export const getUserInfo = () => {

}