import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

const ExamPage: React.FC = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const navigate = useNavigate();

  // State management
  const [questions, setQuestions] = useState<
    { id: string; question: string; options: string[]; correctAnswer: string }[]
  >([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes countdown (600s)
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
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

        setQuestions(questionList);
      } catch (err) {
        console.error("Error fetching questions", err);
        toast.error("Failed to load questions.");
      }
    };

    fetchQuestions();

    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // Auto-submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle selecting an answer
  const handleOptionSelect = (questionId: string, selectedOption: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  // Handle exam submission
  const handleSubmit = () => {
    let correctCount = 0;

    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    toast.success(`Exam submitted! You scored ${correctCount} out of ${questions.length}.`);

    // Navigate to dashboard after 5 seconds
    setTimeout(() => {
      navigate("/dashboard");
    }, 5000);
  };

  return (
    <div className="exam-container">
      <h2>Exam for {courseId}</h2>
      <p>Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</p>
    {questions.length === 0 ? (
        <p>Don't Fret, loading questions .... </p>
    ) : (


      <div className="question-list">
        {questions?.length === 0 && <p>No questions available.</p>}
        {questions?.map((question) => (
          <div key={question.id} className="question-item">
            <h3>{question.question}</h3>
            <div className="options">
                
              {question?.options?.map((option, index) => (
                <label key={index} className="option">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={() => handleOptionSelect(question.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
      {score === null ? (
        <button onClick={handleSubmit} className="submit-btn">
          Submit Exam
        </button>
      ) : (
        <h3>Your Score: {score} / {questions.length}</h3>
      )}
    </div>
  );
};

export default ExamPage;

