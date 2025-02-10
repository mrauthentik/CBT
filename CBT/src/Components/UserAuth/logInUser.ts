import router from "../../Routes/Router";

import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from "firebase/auth";

import { toast } from "react-toastify";

import { auth, db } from '../firebase';
import { FirebaseError } from "firebase/app";


export const loginUser = async (email: string, password: string): Promise<void> => {
  try {
    // Sign in the user with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
     router.navigate('/dashboard')
    console.log("Sign in success", user.displayName);
    localStorage.setItem("userdetails",JSON.stringify(user))

    // Fetch user details from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("Welcome, " + userData.fullName);
      // Navigate to the dashboard
     
    } else {
      console.error("No user data found in Firestore!");
      toast.error("No user data found. Please try again.");
    }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      toast.error(error.message);
      toast.error('Failed to sign in');
    } else {
      toast.error("An unknown error occurred.");
    }
  }
};

