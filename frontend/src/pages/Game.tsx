import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import GameCanvas from '../components/GameCanvas';
import Score from '../components/Score';
import GameOverModal from '../components/GameOverModal';
import TimerBar from '../components/TimerBar';
import { useSnakeEngine, COLS, ROWS } from '../hooks/useSnakeEngine';

const HEIGHT_PERCENTAGE = 0.85;

const Game: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const settings = location.state || {
    gameMode: 'Single Player',
    apples: '1',
    walls: 'Off',
    speed: 'Normal',
  };

  const isMultiplayer = settings.gameMode?.includes('1v1');

  const {
    snake,
    opponentSnake,
    walls,
    apples,
    coin,
    cash,
    applesEaten,
    coinsEarned,
    cashEarned,
    opponentApplesEaten,
    opponentCoinsEarned,
    opponentCashEarned,
    timerStart,
    timerDuration,
    showGameOver,
    gameOverData,
  } = useSnakeEngine(settings, () => navigate(-1));

  const headerRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(15);

  useEffect(() => {
    const updateCellSize = () => {
      if (infoRef.current && headerRef.current) {
        const availableHeight =
          (window.innerHeight -
            infoRef.current.offsetHeight -
            headerRef.current.offsetHeight) *
          HEIGHT_PERCENTAGE;
        const newSize = Math.floor(availableHeight / ROWS);
        setCellSize(newSize > 5 ? newSize : 5);
      }
    };
    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, []);

  const canvasWidth = COLS * cellSize;
  const canvasHeight = ROWS * cellSize;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-mono text-slate-700">
      <Header pageTitle={`Game - ${settings.gameMode}`} ref={headerRef} />
      <div className="flex-1 flex justify-around items-center px-8 pt-20 pb-4 gap-8">
        <Score
          playerName="Player 1"
          score={applesEaten}
          coins={coinsEarned}
          cash={cashEarned}
        />
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-full mb-3 px-2" ref={infoRef}>
            <progress
              className="w-full h-3 rounded-full overflow-hidden mx-2 shadow-inner border border-gray-300 accent-red-500 [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-red-500 [&::-moz-progress-bar]:bg-red-500"
              value={(applesEaten + opponentApplesEaten) % 5}
              max={5}
            />
            <TimerBar startTime={timerStart} duration={timerDuration} />
          </div>
          <GameCanvas
            snake={snake}
            opponentSnake={
              isMultiplayer && opponentSnake.length > 0 ? opponentSnake : undefined
            }
            walls={walls}
            apples={apples}
            coin={coin}
            cash={cash}
            cellSize={cellSize}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
          />
        </div>
        {isMultiplayer && (
          <Score
            playerName="Player 2"
            score={opponentApplesEaten}
            coins={opponentCoinsEarned}
            cash={opponentCashEarned}
          />
        )}
        {showGameOver && gameOverData && (
          <GameOverModal
            cause={gameOverData.cause}
            applesEaten={gameOverData.applesEaten}
            coinsEarned={gameOverData.coinsEarned}
            cashEarned={gameOverData.cashEarned}
            isMultiplayer={gameOverData.isMultiplayer}
            opponentApplesEaten={gameOverData.opponentApplesEaten}
            opponentCoinsEarned={gameOverData.opponentCoinsEarned}
            opponentCashEarned={gameOverData.opponentCashEarned}
            timePlayed={gameOverData.timePlayed}
            onPlayAgain={gameOverData.onPlayAgain}
            onExit={gameOverData.onExit}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
