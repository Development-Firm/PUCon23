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
  apiKey: "AIzaSyCoWQUrMl_gXfvLF9TDFtF1odDeuY2_7U4",
  authDomain: "pucon23-2e52d.firebaseapp.com",
  projectId: "pucon23-2e52d",
  storageBucket: "pucon23-2e52d.appspot.com",
  messagingSenderId: "262384923629",
  appId: "1:262384923629:web:f38d48451e33a63b686de4",
  measurementId: "G-NVG8SYD0JQ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth=getAuth( app );
export const storage = getStorage(app);
