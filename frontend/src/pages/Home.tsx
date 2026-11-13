import React from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';

const Home: React.FC = () => {
  const menuButtons = [
    {
      title: 'PLAY GAME',
      description: 'Start a new game!',
      buttonText: 'Play',
      buttonLink: '/game-modes',
      buttonBackground: 'green',
      width: 'w-64 md:w-96',
      height: 'h-32',
    },
    {
      title: 'SHOP',
      description: 'Buy new skins',
      buttonText: 'View',
      buttonLink: '/shop',
      buttonBackground: 'orange',
      width: 'w-64 md:w-96',
      height: 'h-32',
    },
    {
      title: 'SETTINGS',
      description: 'Customize your experience',
      buttonText: 'Open',
      buttonLink: '/settings',
      buttonBackground: 'bg-purple-400',
      width: 'w-64 md:w-96',
      height: 'h-32',
    },
    {
      title: 'EXIT',
      description: 'Logout from the game',
      buttonText: 'Logout',
      buttonLink: '/logout',
      buttonBackground: 'bg-red-500',
      width: 'w-64 md:w-96',
      height: 'h-32',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 pt-24">
      <Header pageTitle="Home" />
      <Menu buttons={menuButtons} orientation="vertical" />
    </div>
  );
};

export default Home;