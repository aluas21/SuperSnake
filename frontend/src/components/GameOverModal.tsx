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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-mono">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center text-slate-700 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-red-600 mb-4 tracking-tight">
          Game Over
        </h2>

        <div className="bg-red-50 text-red-700 font-semibold px-4 py-2 rounded-lg mb-6 text-sm border border-red-200 inline-block">
          Cause: {cause}
        </div>

        <div className="space-y-3 mb-6 text-left bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm">
          <p className="font-bold text-slate-800 border-b border-gray-200 pb-1">Your Stats</p>
          <div className="flex justify-between">
            <span className="text-gray-500">Apples Eaten:</span>
            <span className="font-bold text-emerald-600">{applesEaten}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Coins Earned:</span>
            <span className="font-bold text-amber-500">{coinsEarned}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Cash Earned:</span>
            <span className="font-bold text-blue-500">{cashEarned}</span>
          </div>

          {isMultiplayer && (
            <>
              <p className="font-bold text-slate-800 border-b border-gray-200 pb-1 pt-2">Opponent Stats</p>
              <div className="flex justify-between">
                <span className="text-gray-500">Apples Eaten:</span>
                <span className="font-bold text-emerald-600">{opponentApplesEaten ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Coins Earned:</span>
                <span className="font-bold text-amber-500">{opponentCoinsEarned ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Cash Earned:</span>
                <span className="font-bold text-blue-500">{opponentCashEarned ?? 0}</span>
              </div>
            </>
          )}

          <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-gray-600">
            <span>Time Played:</span>
            <span>{Math.floor(timePlayed / 1000)} seconds</span>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition shadow-md hover:shadow-lg cursor-pointer"
          >
            Play Again
          </button>
          <button
            onClick={onExit}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-slate-700 font-bold py-3 px-6 rounded-xl transition cursor-pointer"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
