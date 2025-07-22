import React from 'react';
import Header from '../../components/Header/Header';
import Menu from '../../components/Body/Menu';
import './GameModes.css';

const GameModes: React.FC = () => {
  const menuButtons = [
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
    <div>
      <Header pageTitle="Game Modes" />
      <button className="back__button" onClick={() => navigate(-1)}>
        Back
      </button>
      <Menu buttons={menuButtons} orientation="horizontal" />
    </div>
  );
};

export default GameModes;
