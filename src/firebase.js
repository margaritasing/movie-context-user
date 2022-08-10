// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5wFnegxnySQrWb93SvXAf5Zcat7lM6UM",
  authDomain: "movie-app-0908.firebaseapp.com",
  projectId: "movie-app-0908",
  storageBucket: "movie-app-0908.appspot.com",
  messagingSenderId: "962827488813",
  appId: "1:962827488813:web:f78f9a1790c88a3dccb2a4",
  measurementId: "G-QC76TV0DBX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);