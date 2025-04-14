import React from "react";

type Props = {
  questionCount: number;
  setQuestionCount: (value: number) => void;
  onStart: () => void;
};

const InstructionPage: React.FC<Props> = ({ questionCount, setQuestionCount, onStart }) => {
  return (
    <div className="instruction-container">
      <h2>Exam Instructions</h2>
      <ul>
        <li>📌 Read all questions carefully before answering.</li>
        <li>📌 Choose the best answer for each question.</li>
        <li>📌 The exam will be timed. Ensure you manage your time wisely.</li>
        <li>📌 Once you submit, you cannot change your answers.</li>
        <li>📌 Your progress will be tracked in real-time.</li>
        <li>📌 You can view your answers once you submit.</li>
      </ul>

      <div className="my-4">
        <label htmlFor="questionCount" className="font-medium block mb-2">
          Choose number of questions
        </label>
        <select
          id="questionCount"
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
          className="border px-4 py-2 rounded"
        >
          {Array.from({ length: 61 }, (_, i) => i + 10).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <button className="start-exam-btn" onClick={onStart}>
        Start Exam
      </button>
    </div>
  );
};

export default InstructionPage;
