import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Slider from '../components/Slider';
import GameChat from '../components/GameChat/GameChat';
import GameRoomInfo from '../components/GameRoomInfo/GameRoomInfo';

const GameSettings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const gameMode = location.state?.title || {};

  const appleValues = ['1', '3', '5'];
  const [apples, setApples] = useState('1');

  const [walls, setWalls] = useState('Off');

  const speedValues = ['Slow', 'Normal', 'Fast'];
  const [speed, setSpeed] = useState('Normal');

  const isOnline = gameMode.includes('online');

  return (
    <div>
      <Header pageTitle="Game Settings" />

      {/* Main Container */}
      <div
        className={`relative w-screen h-screen overflow-hidden p-12 box-border font-mono text-slate-700 flex ${
          isOnline ? 'justify-between' : 'justify-center'
        }`}
      >
        {/* Room Info */}
        {isOnline && (
          <GameRoomInfo
            code="1234"
            players={[
              { name: 'Player1', status: 'Ready' },
              { name: 'Player2', status: 'Joined' },
            ]}
          />
        )}

        {/* Settings Info */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center justify-center">

          <Slider
            name="Apples"
            values={appleValues}
            selectedValue={apples}
            onChange={(value) => setApples(value)}
          />

          <label className="inline-flex items-center gap-2 cursor-pointer mt-4">
            <p className="font-mono font-bold text-slate-700 text-base mb-2">Walls</p>
            <input
              className="w-5 h-5"
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
            className="bg-green-300 border-none px-8 py-4 cursor-pointer font-mono font-bold text-base text-slate-700 mt-20"
          >
            Ready
          </button>
        </div>

        {/* Chat */}
        {isOnline && (
          <div className="absolute right-8 top-1/4 -translate-y-1/2 max-h-[90vh] overflow-y-auto">
            <GameChat />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSettings;
