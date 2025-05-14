import React, { useState } from "react";

type Props = {
  questionCount: number;
  setQuestionCount: (value: number) => void;
  onStart: () => void;
  timer: number;
  setTimer: (value: number) => void;
};

const InstructionPage: React.FC<Props> = ({
  questionCount,
  setQuestionCount,
  onStart,
  timer,
  setTimer,
}) => {
  // const [customTimer, setCustomTimer] = useState<number | null>(timer)
  // const handleCustomTimerChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
  //   const value = parseInt(e.target.value, 10)
  //   if(!NaN(value) && value > 0){
  //     setCustomTimer(value)
  //   }
  // }
  // const handleSetTimer = () =>{
  //   if(customTimer !== null && customTimer > 0){
  //     setTimer(customTimer)
  //   }
  // }
  return (
    <div className="instruction-container max-w-xl mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">Exam Instructions</h2>
      <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
        <li>📌 Read all questions carefully before answering.</li>
        <li>📌 Choose the best answer for each question.</li>
        <li>📌 The exam will be timed. Ensure you manage your time wisely.</li>
        <li>📌 Once you submit, you cannot change your answers.</li>
        <li>📌 Your progress will be tracked in real-time.</li>
        <li>📌 You can view your answers once you submit.</li>
      </ul>

      <div className="my-6">
        <label htmlFor="questionCount" className="font-medium block mb-2">
          Choose number of questions
        </label>
        <select
          id="questionCount"
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {Array.from({ length: 61 }, (_, i) => i + 10).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="my-6">
        <label htmlFor="timer" className="font-medium block mb-2">
          Select Timer Duration
        </label>
        <select
          id="timer"
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value={0}>No Timer</option>
          <option value={5 * 60}>5 minutes</option>
          <option value={10 * 60}>10 minutes</option>
          <option value={15 * 60}>15 minutes</option>
          <option value={30 * 60}>30 minutes</option>
          <option value={60 * 60}>1 hour</option>
        </select>
      </div>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        onClick={onStart}
      >
        Start Exam
      </button>
    </div>
  );
};

export default InstructionPage;
