import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where,doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

//Import to add students progress
import { addProgressData } from "./addProgressData";
import { updateProgressData } from "./updatProgressData";

import { Id, toast } from "react-toastify";

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
    { id: string; question: string; options: string[]; correctAnswer: string }[]
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
  const handleSubmit = () => {
   
    //This Logic adds user Progress
    const today = new Date().toISOString().split("T")[0];
    const userScore:number = score || 0;
    addProgressData(today, userScore);
    console.log("Progress data added successfully!");

    //To update users progress
    updateProgressData(today, userScore);
     
    let correctCount = 0;

    console.log({questions,answers})

    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
     
    });
    
    setScore(correctCount);

    toast.success(`Exam submitted! You scored ${correctCount} out of ${questions.length}.`);
     setShowAnswers(true)

    // Navigate to dashboard after 5 seconds
    // setTimeout(() => {
    //   navigate("/dashboard");
    // }, 10000);
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
       <h2>Exam for {courseId}</h2>
       <Timer stopTimer initialTime={examTime} onTimeUp={handleSubmit} />
     {loading ?(
         <p> loading questions .... </p>
     ) : questions.length === 0 ? (
         <p> No questions available for this course</p>
     ): (
 
 
       <div className="question-list">
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
           <div key={question.id} className="question-item">
             <h3>{index + 1}.{question.question}</h3>
             <div className="options">
                 
               {question?.options?.map((option, index) => (
                 <label key={index} className="option">
                   
                   <input
                     type="radio"
                     name={question.id}
                     value={option}
                     checked={answers[question.id] === option}
                     onChange={() => handleOptionSelect(question.id, option)}
                     disabled={showAnswers}
                   />
                   {option}
                 </label>
               ))}
             </div>

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
         <button onClick={handleSubmit} className="submit-btn">
           Submit Exam
         </button>
       ) : (
         <>
         <h3>Your Score: {score} / {questions.length}</h3>
         <button onClick={handleRetakeExam} className='retake-btn'>Retake Exam </button>
        </>
       )}
     </div>
    )     
   
    }

    </div>
  );
};

export default ExamPage;

function then(arg0: () => Id) {
  throw new Error("Function not implemented.");
}

