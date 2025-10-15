import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './GameSettings.css';
import Slider from '../../components/Slider/Slider';
import GameChat from '../../components/GameChat/GameChat';
import GameRoomInfo from '../../components/GameRoomInfo/GameRoomInfo';

const GameSettings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const gameMode = location.state?.title || {};

  const appleValues = ['1', '3', '5'];
  const [apples, setApples] = useState('1');

  const [walls, setWalls] = useState('Off');

  const speedValues = ['Slow', 'Normal', 'Fast'];
  const [speed, setSpeed] = useState('Normal');

  return (
    <div>
      <Header pageTitle="Game Settings" />
      <button className="settings__back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      <div
        className={`settings__container ${
          gameMode.includes("online") ? "online" : ""
        }`}
      > {/* Added conditional CSS class */}
        {gameMode.includes("online") && (
          <div className="room-info-wrapper">
            <GameRoomInfo 
              code="1234"
              players={[
                { name: "Player1", status: "Ready" },
                { name: "Player2", status: "Joined" },
              ]}
            />
          </div>
        )}
        <div className="settings__info">
          <h2>Settings</h2>
          <Slider
            name="Apples"
            values={appleValues}
            selectedValue={apples}
            onChange={(value) => setApples(value)}
          />
          <label className="settings__toggle">
            <span className="settings__label-text">Walls</span>
            <input
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
            className="settings__ready-button"
            onClick={() => {
              const settings = {
                gameMode: gameMode || 'Single Player',
                apples: apples || '1',
                walls: walls || 'Off',
                speed: speed || 'Normal',
              };
              // localStorage.setItem("gameSettings", JSON.stringify(settings));
              navigate('/game', { state: settings });
            }}
          >
            Ready
          </button>
        </div>
        {gameMode.includes("online") && (
          <div className="chat-wrapper">
            <GameChat />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSettings;
