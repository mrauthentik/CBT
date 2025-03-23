import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where,doc, getDoc } from "firebase/firestore";
import { db , auth} from "../firebase";

//Import to add students progress
import { addProgressData } from "./addProgressData";
import { updateProgressData } from "./updatProgressData";

import {  toast } from "react-toastify";

import { GoogleGenerativeAI } from "@google/generative-ai"

import { Timer } from "./Timer";
import SideBar from "../SideBar";
import User from "./UserName";

const ExamPage: React.FC = () => {
  const { courseId } = useParams(); // Get courseId from URL
  // const navigate = useNavigate();

  // State management
  const [showInstructions, setShowInstructions] = useState(true)
  const [questions, setQuestions] = useState<
    { id: string; question: string; options: string[]; correctAnswer: string; type:string;}[]
  >([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [examTime, setExamTime] = useState(600)
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false)
  // const [stopTimer, setStopTimer] = useState(false)
 const [explanations, setExplanations] = useState<{[key:string]:string}>({})

  useEffect(() => {
    const fetchTimerSettings = async () =>{
        try{
            const settingsDoc = await getDoc(doc(db, "settings", 'global'));
            if(settingsDoc.exists()){
              setExamTime(settingsDoc.data().duration)
            }
            console.log("Timer settings fetched successfully 🚀🚀")
        }catch(error){
          console.log("Error fetching timer settings",error)
        }
    }

    const fetchQuestions = async () => {
      try {
        const questionsCollection = collection(db, "questions");
        const q = query(questionsCollection, where("courseId", "==", courseId))
        const questionSnapshot = await getDocs(q);
        const questionList = questionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as {
          id: string;
          question: string;
          options: string[];
          correctAnswer: string;
          type: string;
         
        }[];

        //This Logic is to shuffle questions using Fisher-Yates algorithm

        for(let i = questionList.length - 1; i > 0; i--){
          const j = Math.floor(Math.random() * (i + 1));
          [questionList[i], questionList[j]] = [questionList[j], questionList[i]]
        }
          
        setQuestions(questionList);
      } catch (err) {
        console.error("Error fetching questions", err);
        toast.error("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchTimerSettings()
    fetchQuestions();

    // Timer logic
    
  }, []);

  //AI Intetegration
  const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
if (!apiKey) {
  throw new Error("API key is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})

const getExplanation = async (questions: string, correctAnswer:string) => {

  try{
     const prompt = `Explain why the is the ${correctAnswer} to the following question ${questions} \n and how can this ${questions} be solved`
    const result = await model.generateContent(prompt)
    return result.response.text()
    }
  catch (error:unknown){
    console.log("Could not fetch response",error)
    return "Could not fetch response"
  }
  
}

const handleExplanation = async (questionId: string, question:string, correctAnswer: string) => {

  const explanation = await getExplanation(question,correctAnswer)
  setExplanations((prev)=>({...prev, [questionId]:explanation}))
}

  // Handle selecting an answer
  const handleOptionSelect = (questionId: string, selectedOption: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
   
  };



  
  // Handle exam submission
  const handleSubmit = async () => {
    let correctCount = 0;
  
    // Calculate the score
    questions.forEach((question) => {
      if (answers[question.id]?.trim().toLowerCase() === question.correctAnswer.toLowerCase()) {
        correctCount++;
      }
    });
    
    const finalScore = correctCount;
    setScore(finalScore);
    const userCourseId: string = courseId || "defaultCourseId";
  
    // Save or update progress data in Firestore
    const today = new Date().toISOString().split("T")[0]; // Format: "2023-10-01"
    try {
      console.log("Submitting score:", finalScore, "for date:", today); // Debug log
  
      // Check if progress data for today already exists
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No authenticated user found!");
      }
  
      const progressRef = collection(db, `users/${user.uid}/progress`);
      const q = query(progressRef, where("date", "==", today), where("courseId", "==", courseId));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        // No entry exists, so add a new one
        await addProgressData(today, finalScore, userCourseId);
        console.log("Progress data added successfully:", { date: today, score: finalScore });
      } else {
        // Entry exists, so update it
        await updateProgressData(today, finalScore, userCourseId);
        console.log("Progress data updated successfully:", { date: today, score: finalScore });
      }
  
      toast.success(`Exam submitted! You scored ${finalScore} out of ${questions.length}.`);
      setShowAnswers(true);
    } catch (error) {
      console.error("Error saving progress data:", error);
      toast.error("Failed to save progress data.");
    }
  };
  

  const handleRetakeExam = () =>{
    setAnswers({})
    setScore(null)
    setShowAnswers(false)
    setExplanations({})
  }

  const handleStartExam = ()=> {
    setShowInstructions(false)
  }

  //this code is to caclulate Exam Progress
  const totalQuestions = questions.length
  const answeredQuestions = Object.keys(answers).length
  const unansweredQuestions = totalQuestions - answeredQuestions
  const progressPercentage = (answeredQuestions / totalQuestions) * 70

  return (
    <div>
    <SideBar />
    <User />
    
    {/* Show instruction condition */}
    {showInstructions ? (
      <div className="instruction-container">
        <h2>Exam Instructions</h2>
        <ul>
            <li>Read all questions carefully before answering.</li>
            <li>Choose the best answer for each question.</li>
            <li>The exam will be timed. Ensure you manage your time wisely.</li>
            <li>Once you submit, you cannot change your answers.</li>
            <li>Your progress will be tracked in real-time.</li>
          </ul>
          <button className="start-exam-btn" onClick={handleStartExam}>
            Start Exam
          </button>
      </div>
    ):(
       <div className="exam-container">
        <div className="flex justify-between items-center bg-white py-5 px-5 center rounded-lg">
        <h2>Exam for {courseId}</h2>
        <Timer stopTimer initialTime={examTime} onTimeUp={handleSubmit} />
        
        {/*<Timer stopTimer initialTime={examTime} onTimeUp={handleSubmit} />*/}
        </div>

     {loading ?(
         <p> loading questions .... </p>
     ) : questions.length === 0 ? (
         <p> No questions available for this course</p>
     ): (
 
       <div className="py-5 px-5 mt-5 center rounded-lg bg-white">
         <div className="progress-container">
           <p>
             <strong>{answeredQuestions}</strong> answered | <strong>{unansweredQuestions}</strong> 
           </p>
           <div className="progress-bar">
             <div className="progress" style={{width: `${progressPercentage}%`}}></div>
           </div>
         </div>
 
        {/* Questions  */}
         {questions?.length === 0 && <p>No questions available.</p>}
         {questions?.map((question,index) => (
           <div key={question.id} className="question-item mb-6 space-y-2">
             <h3 className="mb-3">{index + 1}.{question.question}</h3>
            
            {question.type != "multiple-choice" ? (

             <div className="options">
                 
               {question?.options?.map((option, index) => (
                 <label key={index} className="option mb-3">
                   
                   <input
                     type="radio"
                     name={question.id}
                     value={option}
                     className=" mr-4"
                     checked={answers[question.id] === option}
                     onChange={() => handleOptionSelect(question.id, option)}
                     disabled={showAnswers}
                   />
                   {option}
                 </label>
               ))}
             </div>
            ):(
              <input
              type="text"
              name={question.id}
              placeholder="Type your answer"
              className="bg-[#eee]  h-9 rounded-md px-3 py-1 text-sm"
              value={answers[question.id] || ""}
              onChange={(e) => handleOptionSelect(question.id, e.target.value)}
              disabled={showAnswers}
          />
            )}

              {/* This logic shows correct answers after submission */}
              {showAnswers && (
                <div className="ai-container">

                <p className ="correct-answer">
                  Correct Answer: <strong>{question.correctAnswer} </strong>
                   </p>
                   <button className="ai-explain-btn" onClick={()=> handleExplanation(question.id,question.question, question.correctAnswer)}>Nexa Explain 🧠</button>
                  
                  {/* AI Explaination Box */}

                  {explanations[question.id] ?(
                      <div className="ai-explanation-box">
                        <h4>Nexa Explanation</h4>
                        <p className="explanation"> {explanations[question.id]}</p>
                      </div>
                  ):(
                      <p className="loading-text">⏳ Waiting for AI response...</p>
                    )}
                  
                </div>
                  )
              }
           </div>
         ))}
       </div>
     )}


     {/* This code show score and retake button */}

       {score === null ? (
         <button onClick={handleSubmit} className="submit-btn max-h-fit bg-[#008080] text-white px-4 py-2 rounded-md hover:bg-[#006666] cursor-pointer mt-5 mb-5">
           Submit Exam
         </button>
       ) : (
         <>
        <h3 className="text-2xl font-semibold text-gray-800  mt-5">
    Your Score:{score} / {questions.length}
  </h3>
  <button
    onClick={handleRetakeExam}
    className="retake-btn bg-[#008080] text-white py-2 px-4 rounded-md hover:bg-[#006666] transition duration-300 mt-5 mb-5 cursor-pointer"
  >
    Retake Exam
  </button>
        </>
       )}
     </div>
    )     
   
    }

    </div>
  );
};

export default ExamPage;

// function then(arg0: () => Id) {
//   throw new Error("Function not implemented.");
// }

