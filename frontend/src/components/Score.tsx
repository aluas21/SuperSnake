import React from 'react';

export interface ScoreProps {
  playerName: string;
  score: number;
  coins: number;
  cash: number;
}

export const Score: React.FC<ScoreProps> = ({ playerName, score, coins, cash }) => {
  return (
    <div className="score__panel">
      <h2>{playerName}</h2>
      <p>Score: {score}</p>
      <p>Coins: {coins}</p>
      <p>Cash: {cash}</p>
    </div>
  );
};

export default Score;
