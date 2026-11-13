import React, { useEffect, useState } from 'react';

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
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mx-2 shadow-inner border border-gray-300">
      <div
        className="h-full bg-amber-400 transition-all duration-75 ease-linear rounded-full"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default TimerBar;
