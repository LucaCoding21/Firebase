// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD60n2woSnaCaNGHoqG7CFbK3y4VupeCWQ",
  authDomain: "testing321-726b3.firebaseapp.com",
  projectId: "testing321-726b3",
  storageBucket: "testing321-726b3.appspot.com",
  messagingSenderId: "1029062965441",
  appId: "1:1029062965441:web:706195db211eb67132bc40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
