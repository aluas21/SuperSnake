import React from 'react';
import SnakeCanvas from '../components/SnakeCanvas';

const Game: React.FC = () => {
  return (
    <div>
      <h1>Super Snake</h1>
      <SnakeCanvas />
    </div>
  );
};

export default Game;
