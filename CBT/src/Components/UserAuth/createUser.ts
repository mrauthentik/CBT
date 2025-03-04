
import {auth,db} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, serverTimestamp, setDoc} from "firebase/firestore"
import router from '../../Routes/Router';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

export const createUser = async (email: string, password: string, fullName:string) => {  
      
    try {
        const userCredential =  await createUserWithEmailAndPassword (auth, email , password )
        const user = userCredential.user
        await updateProfile(user, {displayName: fullName})

       await setDoc (doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
        createdAt: serverTimestamp(),
       });
       toast.success('User signed up successfully', { autoClose: 3000, position: "top-center" });
       router.navigate('/dashboard')
        console.log('Sign up success', userCredential.user)
       
    }
    catch (error){
        if (error instanceof Error) {
            toast.error(error.message, { autoClose: 3000, position: "top-center" });
          } else {
            toast.error("An unknown error occurred.", { autoClose: 3000, position: "top-center" });
          }
    }
}

//function for the Google Sign-in

