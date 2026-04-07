import React, { useState, useEffect, useRef } from "react";
import './../styles/App.css';

const App = () => {

  const [time, setTime] = useState(0); // time in ms
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);

  // format time → mm:ss:cs
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const centiseconds = Math.floor((time % 1000) / 10);

    return (
      String(minutes).padStart(2, '0') + ':' +
      String(seconds).padStart(2, '0') + ':' +
      String(centiseconds).padStart(2, '0')
    );
  };

  // START
  const handleStart = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 10);
    }, 10);
  };

  // STOP
  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // LAP
  const handleLap = () => {
    setLaps(prev => [...prev, time]);
  };

  // RESET
  const handleReset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(0);
    setLaps([]);
  };

  // CLEANUP (IMPORTANT)
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>

      <h1>{formatTime(time)}</h1>

      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleLap}>Lap</button>
      <button onClick={handleReset}>Reset</button>

      <ul>
        {laps.map((lap, index) => (
          <li key={index}>{formatTime(lap)}</li>
        ))}
      </ul>

    </div>
  );
};

export default App;