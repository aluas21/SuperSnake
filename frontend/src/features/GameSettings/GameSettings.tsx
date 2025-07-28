import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './GameSettings.css';
import Slider from '../../components/Slider/Slider';

const GameSettings: React.FC = () => {
  const navigate = useNavigate();

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
      <div className="settings__container">
        <h2>Room info</h2>
        <div className="settings__info">
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
        <h2>Chat</h2>
      </div>
    </div>
  );
};

export default GameSettings;
