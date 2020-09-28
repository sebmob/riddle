import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCSt8mtMV6HeOAY907MerjTwI0LPQ4bQJE",
    authDomain: "riddle-d7331.firebaseapp.com",
    databaseURL: "https://riddle-d7331.firebaseio.com",
    projectId: "riddle-d7331",
    storageBucket: "riddle-d7331.appspot.com",
    messagingSenderId: "89205362373",
    appId: "1:89205362373:web:0d232603e933e01fc6aaac",
    measurementId: "G-60SMYF966M"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  export { firebase };