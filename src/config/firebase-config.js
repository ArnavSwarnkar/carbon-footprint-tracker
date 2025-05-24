// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr9g8uwDMtvq2BnQsjXgDbkdP5-ohpfwA",
  authDomain: "carbon-footprint-fb841.firebaseapp.com",
  projectId: "carbon-footprint-fb841",
  storageBucket: "carbon-footprint-fb841.firebasestorage.app",
  messagingSenderId: "38749364659",
  appId: "1:38749364659:web:ecd1a695c089cc76896bc6",
  measurementId: "G-55EYZSDR9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);