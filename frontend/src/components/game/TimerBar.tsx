import React, { useEffect, useState } from 'react';
import '../TimerBar/TimerBar.css';

export interface TimerBarProps {
  duration: number;
  startTime: number | null;
}

export const TimerBar: React.FC<TimerBarProps> = ({ duration, startTime }) => {
  const [width, setWidth] = useState(100);

  useEffect(() => {
    if (!startTime) return;

    let animationFrameId: number;

    const update = () => {
      const elapsed = Date.now() - startTime;
      const ratio = 1 - elapsed / duration;
      setWidth(Math.max(0, ratio * 100));
      if (elapsed < duration) {
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
