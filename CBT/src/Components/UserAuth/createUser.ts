
import {auth,db} from '../firebase';
import {createUserWithEmailAndPassword, fetchSignInMethodsForEmail} from 'firebase/auth';
import { doc, serverTimestamp, setDoc, } from "firebase/firestore"
import router from '../../Routes/Router';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

export const createUser = async (email: string, password: string, fullName:string) => {  
      
    try {
       

        //Check authentication system for exisiting email
        const signInMethods = await fetchSignInMethodsForEmail(auth, email)
        if(signInMethods.length > 0){
          toast.error('This email is already registered. Try logging instead')
          throw new Error('Email already in use')
          return;
        }

        //Create New user Account
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
          console.log('Error saving to firestore', error)
          throw new Error('Failed to save user data')
    }
}

//function for the Google Sign-in

