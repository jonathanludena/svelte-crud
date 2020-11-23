import firebase from "firebase/app";
import "firebase/firestore"

// Your web app's Firebase configuration
let firebaseConfig = {
  // configuracion de proyecto
  // ...
  // ...
  // ...
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();