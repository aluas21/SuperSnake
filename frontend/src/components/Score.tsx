import React from 'react';

export interface ScoreProps {
  playerName: string;
  score: number;
  coins: number;
  cash: number;
}

export const Score: React.FC<ScoreProps> = ({ playerName, score, coins, cash }) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 font-mono text-slate-700 min-w-[220px] h-fit border border-gray-100">
      <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4 w-full text-center">
        {playerName}
      </h2>
      <div className="flex flex-col gap-3 w-full text-base">
        <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
          <span className="font-semibold text-gray-500">Score:</span>
          <span className="font-bold text-lg text-emerald-600">{score}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
          <span className="font-semibold text-gray-500">Coins:</span>
          <span className="font-bold text-lg text-amber-500">{coins}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
          <span className="font-semibold text-gray-500">Cash:</span>
          <span className="font-bold text-lg text-blue-500">{cash}</span>
        </div>
      </div>
    </div>
  );
};

export default Score;
