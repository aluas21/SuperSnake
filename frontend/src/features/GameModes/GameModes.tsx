import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Menu from '../../components/Body/Menu';
import './GameModes.css';

const GameModes: React.FC = () => {
	const navigate = useNavigate();

  const offlineModes = [
    {
      title: 'Single Player',
      description: 'Play the classic Snake game alone',
      buttonText: 'Play',
      buttonLink: '/game',
      buttonbackground: 'blue',
    },
    {
      title: '1v1 (offline)',
      description: 'Play against a friend using the same keyboard',
      buttonText: 'Play',
      buttonLink: '/game',
      buttonbackground: 'purple',
    },
  ];

  const onlineModes = [
    {
      title: '1v1 AI',
      description: 'Play against AI snake',
      buttonText: 'Play',
      buttonLink: '/game',
      buttonbackground: 'orange',
    },
    {
      title: '1v1 (online)',
      description: 'Play against a friend online',
      buttonText: 'Join',
      buttonLink: '/game',
      buttonbackground: 'green',
    },
  ];

return (
  <div className="game-modes__wrapper">
    <Header pageTitle="Game Modes" />
    <button className="back__button" onClick={() => navigate(-1)}>
      Back
    </button>
    <div className="game-modes__grid">
      <Menu buttons={offlineModes} orientation="vertical" />
      <Menu buttons={onlineModes} orientation="vertical" />
    </div>
  </div>
);
};

export default GameModes;
