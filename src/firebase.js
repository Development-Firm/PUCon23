// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/storage';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries





// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjVqGMQpbUjUpt7vnZeBN-cf1oNzn2EIE",
  authDomain: "appfest-a49dd.firebaseapp.com",
  projectId: "appfest-a49dd",
  storageBucket: "appfest-a49dd.appspot.com",
  messagingSenderId: "23623346346",
  appId: "1:23623346346:web:18d363a4d87e2b396908d3",
  measurementId: "G-BX6QYDYD2P"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth=getAuth( app );
export const storage = getStorage(app);
