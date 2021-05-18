import React, { useEffect, useRef, useState } from "react";

interface TimerProps {
  startTimeout: number;
}

const TIME_ITERATION = 1000;

export const Timer = ({ startTimeout }: TimerProps) => {
  const [isTicking, setIsTicking] = useState(false);
  const [time, setTime] = useState(startTimeout);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tick = () => setTime((time) => time - TIME_ITERATION);
  const removeInterval = (newTime?: number) => {
    setIsTicking(false);
    clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
    intervalRef.current = null;
    if (newTime) setTime(newTime);
  };

  useEffect(() => removeInterval, []);
  useEffect(() => {
    // turned off
    if (!isTicking) return removeInterval();
    // time is out
    if (time <= 0) return removeInterval(startTimeout);
    // is active
    if (intervalRef.current) return;
    // just activated
    if (time > 0) tick();
    // stil not run out
    if (time > 0) intervalRef.current = setInterval(tick, TIME_ITERATION);
  }, [isTicking, time, startTimeout]);

  const onStartAndPause = () => {
    setIsTicking((isTicking) => !isTicking);
  };

  const onReset = () => {
    removeInterval(startTimeout);
  };

  return (
    <>
      <div
        style={{
          width: "200px",
          fontSize: "2em",
          display: "flex",
          justifyContent: "center"
        }}
      >
        {time / TIME_ITERATION}
      </div>
      <button style={{ width: "100px" }} onClick={onStartAndPause}>
        {isTicking ? "Pause" : "Start"}
      </button>
      <button style={{ width: "100px" }} onClick={onReset}>
        Reset
      </button>
    </>
  );
};

export default () => {
  return <Timer startTimeout={10 * 1000} />;
};
