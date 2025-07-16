import React, { use } from 'react';
import { useEffect, useRef, useState } from 'react';
import SnakeCanvas from '../components/SnakeCanvas';

const Game: React.FC = () => {
  const [applesEaten, setApplesEaten] = useState(0);
  const [showCoin, setShowCoin] = useState(false);
  const [coinTimer, setCoinTimer] = useState(0);
  const COIN_TIMEOUT = 3000; // 3 seconds

  const handleAppleEaten = () => {
    setApplesEaten((prev) => {
      const newCount = prev + 1;
      if (newCount % 5 === 0) {
        setShowCoin(true);
        setCoinTimer(COIN_TIMEOUT);
      }
      return newCount;
    });
  };

	const onGameOver = () => {
		alert('Game Over! You ate ' + applesEaten + ' apples.');
		setApplesEaten(0);
		setShowCoin(false);
		setCoinTimer(0);
	};

  // coin countdown
  useEffect(() => {
    if (!showCoin) return;

    const timer = setInterval(() => {
      setCoinTimer((prev) => {
        if (prev <= 1000) {
          setShowCoin(false);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showCoin]);

  return (
    <div>
      <h1>Super Snake</h1>
      <progress value={applesEaten % 5} max={5} />
      {showCoin && <p>Coin dissapears in {coinTimer / 1000}s</p>}
      <SnakeCanvas
        onAppleEaten={handleAppleEaten}
        showCoin={showCoin}
        onCoinCollected={() => setShowCoin(false)}
				onGameOver={onGameOver}
      />
    </div>
  );
};

export default Game;
