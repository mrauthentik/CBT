// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUQpkoT4mgMMs7U6bNxq9JfRZfrt7THUQ",
  authDomain: "cbt-auth-7fb1e.firebaseapp.com",
  projectId: "cbt-auth-7fb1e",
  storageBucket: "cbt-auth-7fb1e.firebasestorage.app",
  messagingSenderId: "92754315099",
  appId: "1:92754315099:web:ddfad5858988fc4503fc7e",
  measurementId: "G-Z9NF385B0D"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app) 
const db = getFirestore(app)

export {auth, db, analytics}
