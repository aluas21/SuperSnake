import React, { useEffect, useRef } from 'react';

export interface TimerBarProps {
  duration: number;
  startTime: number | null;
}

export const TimerBar: React.FC<TimerBarProps> = ({ duration, startTime }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (!startTime || duration <= 0) {
      bar.style.transform = 'scaleX(0)';
      return;
    }

    let id: number;
    const update = () => {
      const ratio = Math.min(1, Math.max(0, 1 - (Date.now() - startTime) / duration));
      bar.style.transform = `scaleX(${ratio})`;
      if (ratio > 0) id = requestAnimationFrame(update);
    };
    id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, [startTime, duration]);

  return (
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mx-2 shadow-inner border border-gray-300">
      <div ref={barRef} className="w-full h-full bg-amber-400 origin-left will-change-transform" />
    </div>
  );
};

export default React.memo(TimerBar);