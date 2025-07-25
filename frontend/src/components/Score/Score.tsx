import React from 'react';
import './Score.css';

interface ScoreProps {
  playerName: string;
  score: number;
  coins: number;
  cash: number;
}

const Score: React.FC<ScoreProps> = ({ playerName, score, coins, cash }) => {
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
