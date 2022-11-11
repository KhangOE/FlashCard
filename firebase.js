// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyJqKr4IRX9yxrH32C82s72OePc6M77vo",
  authDomain: "moneyd-fa351.firebaseapp.com",
  projectId: "moneyd-fa351",
  storageBucket: "moneyd-fa351.appspot.com",
  messagingSenderId: "980173626462",
  appId: "1:980173626462:web:724cd97c489c48213f28cf",
  measurementId: "G-LVJ5RCWB1Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// firebase authentication
const auth = getAuth(app);

export {
    app,
    db,
    auth
}