import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyAAX51sxYIlv5DHhMI46dLvUYydK2lWAiY",
  authDomain: "sparking-d3380.firebaseapp.com",
  databaseURL: "https://sparking-d3380.firebaseio.com",
  projectId: "sparking-d3380",
  storageBucket: "sparking-d3380.appspot.com",
  messagingSenderId: "473975625968"
};
firebase.initializeApp(config);

export const database = () => firebase.database();
export const storage = () => firebase.storage();