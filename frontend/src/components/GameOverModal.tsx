import React from 'react';

export interface GameOverData {
  cause: string;
  applesEaten: number;
  coinsEarned: number;
  cashEarned: number;
  isMultiplayer: boolean;
  opponentApplesEaten?: number;
  opponentCoinsEarned?: number;
  opponentCashEarned?: number;
  timePlayed: number;
  onPlayAgain: () => void;
  onExit: () => void;
}

export const GameOverModal: React.FC<GameOverData> = (gameOverData: GameOverData) => {
  const {
    cause,
    applesEaten,
    coinsEarned,
    cashEarned,
    isMultiplayer,
    opponentApplesEaten,
    opponentCoinsEarned,
    opponentCashEarned,
    timePlayed,
    onPlayAgain,
    onExit,
  } = gameOverData;

  return (
    <div className="game-over-modal__backdrop">
      <div className="game-over-modal">
        <h2>Game Over</h2>
        <p>
          <strong>Cause:</strong> {cause}
        </p>
        <p>
          You ate {applesEaten} apples, earned {coinsEarned} coins and{' '}
          {cashEarned} cash.
        </p>

        {isMultiplayer && (
          <p>
            Opponent ate {opponentApplesEaten} apples, earned{' '}
            {opponentCoinsEarned} coins and {opponentCashEarned} cash.
          </p>
        )}

        <p>Time played: {Math.floor(timePlayed / 1000)} seconds</p>
        <button onClick={onPlayAgain}>Play Again</button>
        <button onClick={onExit}>Exit</button>
      </div>
    </div>
  );
};

export default GameOverModal;
