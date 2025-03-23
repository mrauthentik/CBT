import {db} from "../firebase"
import { collection, addDoc } from "firebase/firestore"

const addQuestions = async ()=>{
    try{
        await addDoc (collection(db, "questions"), {
            courseId:"MTH101",
            text: "What is 4 + 4",
            type: "single-choice",
            options:["4","5","8","10"],
            correctAnswer: "8"
        });
        await addDoc(collection(db, "question"),{
            courseId: "MTH101",
            text: "Solve for x: x + 5 = 10",
            type: "fill-in-the-blank",
            correctAnswer: "5"

        });
        console.log('question added successfully')
    }
    catch (err){
        console.log(err)
    }
}
export default addQuestions
