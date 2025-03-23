import React, { useEffect, useState } from "react";

import 'bootstrap-icons/font/bootstrap-icons.css';

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
  stopTimer: boolean;
}

export const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp,  }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 100);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp,]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const timerStyle = {
    color: timeLeft < 70 ? "red" : "black",
  }

  return (
    <div className="timer flex items-center gap-2" style={timerStyle}>
    
    {/* Alarm Clock Icon - color changes with time */}
  <i
    className="bi bi-alarm-fill text-2xl"
    style={{ color: timeLeft < 70 ? "red" : "#008080" }}
  ></i>

    {minutes}:{String(seconds).padStart(2, "0")}
  </div>
  
  );
};