import React, { useEffect, useState } from "react";
import "./TimerBar.css";

interface TimerBarProps {
  duration: number; // ms
  startTime: number | null;
}

const TimerBar: React.FC<TimerBarProps> = ({ duration, startTime }) => {
  const [width, setWidth] = useState(100);

  useEffect(() => {
    if (!startTime) return;

    const endTime = startTime + duration;

    let animationFrameId: number;

    const update = () => {
      const now = Date.now();
      const ratio = (endTime - now) / duration;
      setWidth(Math.max(0, ratio * 100));
      if (now < endTime) {
        animationFrameId = requestAnimationFrame(update);
      }
    };

    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, [duration, startTime]);

  return (
    <div className="timer-bar">
      <div className="timer-bar-fill" style={{ width: `${width}%` }} />
    </div>
  );
};

export default TimerBar;
