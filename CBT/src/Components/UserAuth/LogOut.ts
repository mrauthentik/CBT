import { signOut, getAuth } from "firebase/auth";
import { app } from "../firebase"; // Adjust the path as necessary
import { toast } from "react-toastify";
import router from "../../Routes/Router";


    const auth = getAuth(app);

const logOutUser = async () => {
    try{
        await signOut(auth);
        toast.success('User signed out successfully', { autoClose: 3000, position: "top-center" }); 
       router.navigate('/')

    
    }
    catch (error:unknown){
        console.log(error)
    }
    
}



export default logOutUser ;