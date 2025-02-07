
import {auth} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';


const SignUp = async (email: string, password: string) => {  
      
    try {
        const userCredential =  await createUserWithEmailAndPassword (auth, email , password )
        console.log('Sign in success', userCredential.user)
       
    }
    catch (error){
        console.log('sign up Error', error)
    }
}

//function for the Google Sign-in

export default SignUp;