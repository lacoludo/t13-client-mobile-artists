import * as firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBKQMJwcNRlodeEYP_lCMUQY91Q-ER7Vp0",
  authDomain: "t13-database.firebaseapp.com",
  databaseURL: "https://t13-database.firebaseio.com",
  projectId: "t13-database",
  storageBucket: "t13-database.appspot.com",
  messagingSenderId: "634747026122"
};

export default class Firebase {
  static firestore: firebase.firestore.Firestore;
  static auth: firebase.auth.Auth;
  static storage: firebase.storage.Storage;

  static init() {
    firebase.initializeApp(config);
    Firebase.auth = firebase.auth();
    Firebase.firestore = firebase.firestore();
    Firebase.storage = firebase.storage();
  }
}
