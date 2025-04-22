// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai"
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
const vertexAI = getVertexAI(app)
const model = getGenerativeModel(vertexAI, {model: "gemini-1.0-flash"})

// async function run() {
//   const prompt = "write something"
//   const result = await model.generateContent(prompt)
//   const response = result.response
//   const text = response.text()
//   console.log(text)
// }
// run()

export {auth, db, analytics,app, model}
