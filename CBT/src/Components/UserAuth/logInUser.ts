// import router from "../../Routes/Router";

import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from "firebase/auth";

import { toast } from "react-toastify";

import { auth, db } from '../firebase';
import { FirebaseError } from "firebase/app";



export const loginUser = async (email: string, password: string): Promise<void> => {
 
 //Error Message
 const getFriendlyErrorMessage = (errorCode: string) => {
  const errorMessages: { [key: string]: string } = {
    "auth/invalid-credential": "Invalid email or password. Please try again.",
    "auth/user-not-found": "No account found with this email. Sign up instead?",
    "auth/wrong-password": "Incorrect password. Please try again or reset it.",
    "auth/network-request-failed": "Network error. Check your connection and try again.",
    "auth/too-many-requests": "Too many failed attempts. Try again later.",
    "auth/user-disabled": "This account has been disabled. Contact support for help.",
    "auth/email-already-in-use": "This email is already registered. Try logging in.",
  };

  return errorMessages[errorCode] || "An unexpected error occurred. Please try again.";
};
  try {
    // Sign in the user with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user details from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("Welcome, " + userData.fullName);

      localStorage.setItem("userdetails",JSON.stringify(user))

      toast.success("Login Successful", {autoClose: 5000, position: "top-center"});
      console.log("Sign in success", user.displayName);
          
    } else {
      console.error("No user data found in Firestore!");
      throw new Error('No user data found. Please sign up first')
    }

  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const errorMessage = getFriendlyErrorMessage(error.code)
       
      toast.error(errorMessage, {autoClose: 5000, position: "top-center"});
      throw new Error(errorMessage)
      
    } else {
      toast.error("An unknown error occurred.");
      throw new Error('An unknown error occurred')
    }
  }
 
};

