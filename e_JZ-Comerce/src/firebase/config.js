// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcZT3njXpmOOh5likbvv_is6C-4cG3P0A",
  authDomain: "reactjzcomerce.firebaseapp.com",
  projectId: "reactjzcomerce",
  storageBucket: "reactjzcomerce.firebasestorage.app",
  messagingSenderId: "1023167263135",
  appId: "1:1023167263135:web:37722f874129ef64790daa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
