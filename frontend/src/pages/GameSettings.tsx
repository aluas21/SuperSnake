import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Slider from '../components/Slider';
import GameChat from '../components/GameChat';
import GameRoomInfo from '../components/GameRoomInfo';

const GameSettings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const gameMode = location.state?.title || {};
  const isOnline = gameMode.includes('online');

  const appleValues = ['1', '3', '5'];
  const [apples, setApples] = useState('1');
  const [walls, setWalls] = useState('Off');
  const speedValues = ['Slow', 'Normal', 'Fast'];
  const [speed, setSpeed] = useState('Normal');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pt-20">
      <Header pageTitle="Game Settings" />

      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 px-4 py-8 font-mono text-slate-700`}
      >
        {isOnline ? (
          <div className="flex justify-center items-start">
            <GameRoomInfo
              code="1234"
              players={[
                { name: 'Player1', status: 'Ready' },
                { name: 'Player2', status: 'Joined' },
              ]}
            />
          </div>
        ) : (
          <div />
        )}

        <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-8">
          <Slider
            name="Apples"
            values={appleValues}
            selectedValue={apples}
            onChange={(value) => setApples(value)}
          />

          <label className="inline-flex items-center gap-2 cursor-pointer mt-6">
            <p className="font-bold text-base">Walls</p>
            <input
              className="w-5 h-5 accent-blue-500"
              type="checkbox"
              id="settingToggle"
              onChange={() => setWalls(walls === 'On' ? 'Off' : 'On')}
            />
          </label>

          <Slider
            name="Speed"
            values={speedValues}
            selectedValue={speed}
            onChange={(value) => setSpeed(value)}
          />

          <button
            onClick={() => {
              const settings = {
                gameMode: gameMode || 'Single Player',
                apples: apples || '1',
                walls: walls || 'Off',
                speed: speed || 'Normal',
              };
              navigate('/game', { state: settings });
            }}
            className="bg-green-300 hover:bg-green-400 transition px-8 py-3 mt-16 font-bold text-base text-slate-700 rounded-md shadow"
          >
            Ready
          </button>
        </div>

        {isOnline ? (
          <div className="flex justify-center items-start">
            <GameChat />
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default GameSettings;
