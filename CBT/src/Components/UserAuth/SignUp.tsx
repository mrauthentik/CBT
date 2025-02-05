import {auth} from '../../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const SignUp = async () => {  

    try {
        const userCredential =  await createUserWithEmailAndPassword (auth,email , password )
        console.log('Sign in success', userCredential.user)
    }
    catch (error){
        console.log('sign up Error', error)
    }
}


export default SignUp;