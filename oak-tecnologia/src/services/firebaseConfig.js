// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwx1D8STlyyBzIMRODW9tEXyUPNZTyS7M",
  authDomain: "oak-tecnologia.firebaseapp.com",
  projectId: "oak-tecnologia",
  storageBucket: "oak-tecnologia.appspot.com",
  messagingSenderId: "1025306218516",
  appId: "1:1025306218516:web:6f679579fab20fb169d701"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);