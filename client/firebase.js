import * as firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD6ZCi0tnOJBPgdGxmfzvYfYbVnuscmLKY",
  authDomain: "hockey-game-ab0b5.firebaseapp.com",
  databaseURL: "https://hockey-game-ab0b5.firebaseio.com",
  projectId: "hockey-game-ab0b5",
  storageBucket: "hockey-game-ab0b5.appspot.com",
  messagingSenderId: "192730912889",
  appId: "1:192730912889:web:2a7ab0129caf7bbb"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export default db