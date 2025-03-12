import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from 'firebase/firestore';
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [courseId, setCourseId] = useState("");
  const [questionType, setQuestionType] = useState("multiple-choice"); // Default type

  const handleSubmit = async () => {
    if (!question || !courseId || (questionType === "multiple-choice" && (!optionA || !optionB || !optionC || !optionD))) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const newQuestion = {
        question,
        courseId,
        type: questionType,
        correctAnswer: questionType === "fill-in-the-gap" ? correctAnswer : "",
        options: questionType === "multiple-choice" ? [optionA, optionB, optionC, optionD] : [],
      };

      // This will push the questions to the Firestore DB
      await addDoc(collection(db, "questions"), newQuestion);

      console.log('Question added successfully');
      toast.success('Question added successfully');
      setQuestion("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setCorrectAnswer("");
      setCourseId("");
    } catch (error: unknown) {
      console.log(error);
      toast.error(`Question was not added: ${error}`);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard - Add Questions</h2>
      <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
        <option value="multiple-choice">Multiple Choice</option>
        <option value="fill-in-the-gap">Fill in the Gap</option>
      </select>
      <input
        type="text"
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {questionType === "multiple-choice" && (
        <>
          <input
            type="text"
            placeholder="Option A"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
          />
          <input
            type="text"
            placeholder="Option B"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
          />
          <input
            type="text"
            placeholder="Option C"
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
          />
          <input
            type="text"
            placeholder="Option D"
            value={optionD}
            onChange={(e) => setOptionD(e.target.value)}
          />
          <input
          type="text"
          placeholder="Enter correct answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
        </>
      )}
      {questionType === "fill-in-the-gap" && (
        <input
          type="text"
          placeholder="Enter correct answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      )}
      <input
        type="text"
        placeholder="Enter course code"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Question</button>
    </div>
  );
};

export default AdminDashboard;