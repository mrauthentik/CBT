import { useState, useEffect } from 'react';

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void
}


export const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);


  useEffect (() => {
    const timer = setInterval(() => {
      setTimeLeft ((prev) => {
        if(prev <=1){
          clearInterval(timer);
          onTimeUp()
          return 0
        }
        return prev -1
      });

    }, 1000)
    return () => {
      clearInterval(timer)
     }

  }, [onTimeUp])

  return (
    <p>
      Time left: {Math.floor(timeLeft / 60)}:
      {String(timeLeft % 60).padStart(2, '0')}
    </p>
  )
}