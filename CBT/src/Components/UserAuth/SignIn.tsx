import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
// Example usage of signInUser function

import { UserCredential } from "firebase/auth";


const auth = getAuth();

const signInUser = async (email: string, password: string): Promise<void> => {
    signInUser("example@example.com", "password123");
    try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Sign in success', userCredential.user);
    } 
    catch (error: unknown) {
     toast.error('Could not sign in user', { autoClose: 3000, position: "top-center" });
     console.error('Sign in error', error);
    }
<ToastContainer />
}

export default signInUser;