import React, { useEffect, useState } from "react";

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
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp,]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // const timerStyle = {
  //   color: timeLeft < 900/60 ? "red" : "black",
  // }

  return (
    <div className="timer" >
      Time left: {minutes}:{String(seconds).padStart(2, "0")}
    </div>
  );
};