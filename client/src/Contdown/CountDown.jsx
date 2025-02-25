import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

// Helper function to get remaining time
const getRemainingTime = (endTime) => {
  const currentTime = 1739761834653;
  console.log(Date.now());
  return endTime - currentTime;
};

const CountdownTimer = () => {
  const [endTime, setEndTime] = useState(null);

  // Check for stored endTime in localStorage on mount
  useEffect(() => {
    const storedEndTime = localStorage.getItem('countdownEndTime');
    if (storedEndTime) {
      const remainingTime = getRemainingTime(new Date(storedEndTime).getTime());
      if (remainingTime > 0) {
        setEndTime(new Date(storedEndTime).getTime());
      } else {
        localStorage.removeItem('countdownEndTime'); // Clean up if the time has passed
      }
    }
  }, []);

  // Function to start a new countdown
  const startCountdown = (durationInSeconds) => {
    const newEndTime = 1739761834653    + durationInSeconds * 1000;
    setEndTime(newEndTime);
    localStorage.setItem('countdownEndTime', new Date(newEndTime).toISOString());
  };

  // Reset countdown
  const resetCountdown = () => {
    setEndTime(null);
    localStorage.removeItem('countdownEndTime');
  };

  // Renderer for the Countdown component
  const countdownRenderer = ({days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Event Started</span>;
    } else {
      return (
        <div className="grid grid-cols-4 gap-2">
        <div className="flex items-center justify-center flex-col text-white border-2 rounded-lg py-2 px-3 shadow-[0px_0px_10px_3px_#000]">
          <p>{days}</p>
          <p>Days</p>
        </div>
        <div className="flex items-center justify-center flex-col text-white border-2 rounded-lg py-2 px-3 shadow-[0px_0px_10px_3px_#000]">
          <p>{hours}</p>
          <p>Hours</p>
        </div>
        <div className="flex items-center justify-center flex-col text-white border-2 rounded-lg py-2 px-3 shadow-[0px_0px_10px_3px_#000]">
          <p>{minutes}</p>
          <p>Minutes</p>
        </div>
        <div className="flex items-center justify-center flex-col text-white border-2 rounded-lg py-2 px-3 shadow-[0px_0px_10px_3px_#000]">
          <p>{seconds}</p>
          <p>Seconds</p>
        </div>
      </div>
      );
    }
  };

  return (
    <div className='text-white'>
      {/* <h1>Countdown Timer</h1> */}

      {/* If endTime is set, start countdown */}
      {endTime ? (
        <Countdown
          date={endTime}
          renderer={countdownRenderer}
          onComplete={resetCountdown} // Reset when countdown finishes
        />
      ) : (
        startCountdown(1064000)
      )}

      {endTime && <button className='hidden' onClick={resetCountdown}>Reset</button>}
    </div>
  );
};

export default CountdownTimer;
