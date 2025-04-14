import React from "react";

type Props = {
  questionCount: number;
  setQuestionCount: (value: number) => void;
  onStart: () => void;
  timer: number;
  setTimer: (value:number) => void;
};

const InstructionPage: React.FC<Props> = ({ questionCount, setQuestionCount, onStart, timer, setTimer }) => {
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

      <div className="my-4">
        <label htmlFor="timer" className="font-medium block mb-2">
          Select Timer Duration
        </label>
        <select
          id="timer"
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
          className="border px-4 py-2 rounded"
        >
          <option value={0}>No Timer</option>
          <option value={5 * 60}>5 minutes</option>
          <option value={10 * 60}>10 minutes</option>
          <option value={15 * 60}>15 minutes</option>
          <option value={30 * 60}>30 minutes</option>
          <option value={60 * 60}>1 hour</option>
        </select>
      </div>

      <button className="start-exam-btn" onClick={onStart}>
        Start Exam
      </button>
    </div>
  );
};

export default InstructionPage;
