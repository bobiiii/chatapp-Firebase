// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsddyYaPVOLvl2T6p4cMtUtuFyYX7iVF4",
  authDomain: "suffah-chatapp.firebaseapp.com",
  projectId: "suffah-chatapp",
  storageBucket: "suffah-chatapp.appspot.com",
  messagingSenderId: "100995306203",
appId: "1:100995306203:web:7f2a68fbe8131a0b7432fe"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
