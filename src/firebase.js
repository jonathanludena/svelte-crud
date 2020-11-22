import firebase from "firebase/app";
import "firebase/firestore"

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyB0rEcT1mhvRiUqV65VHauGRThG_G-TIrQ",
  authDomain: "svelte-crud-59376.firebaseapp.com",
  databaseURL: "https://svelte-crud-59376.firebaseio.com",
  projectId: "svelte-crud-59376",
  storageBucket: "svelte-crud-59376.appspot.com",
  messagingSenderId: "615326665407",
  appId: "1:615326665407:web:f2811cbbc404cb4660540a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();