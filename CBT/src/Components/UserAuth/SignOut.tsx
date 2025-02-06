import { signOut, getAuth } from "firebase/auth";
import { app } from "../firebase"; // Adjust the path as necessary
import { toast } from "react-toastify";

const auth = getAuth(app);

const logOutUser = async () => {
    try{
        await signOut(auth);
        toast.success('User signed out successfully', { autoClose: 3000, position: "top-center" }); 
    }
    catch (error:unknown){
        console.log(error)
    }
}

export default logOutUser;