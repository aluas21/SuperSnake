import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';

const GameModes: React.FC = () => {
const navigate = useNavigate();

const offlineModes = [
{
title: 'Single Player',
description: 'Play the classic Snake game alone',
buttonText: 'Play',
buttonLink: '/game-settings',
buttonBackground: 'blue',
width: 'w-[25vw]',
height: 'h-[25vh]',
},
{
title: '1v1 (offline)',
description: 'Play against a friend using the same keyboard',
buttonText: 'Play',
buttonLink: '/game-settings',
buttonBackground: 'purple',
width: 'w-[25vw]',
height: 'h-[25vh]',
},
];

const onlineModes = [
{
title: '1v1 (online)',
description: 'Play against a friend online',
buttonText: 'Join',
buttonLink: '/game-settings',
buttonBackground: 'green',
width: 'w-[25vw]',
height: 'h-[25vh]',
},
{
title: '1v1 AI',
description: 'Play against AI snake',
buttonText: 'Play',
buttonLink: '/game-settings',
buttonBackground: 'orange',
width: 'w-[25vw]',
height: 'h-[25vh]',
},
];

return ( <div className="flex flex-col items-center min-h-screen p-4">
 <Header pageTitle="Game Modes" />
  <div className="flex flex-col items-center justify-center gap-4 min-h-[85vh] pt-[15vh]">
    <Menu buttons={offlineModes} orientation="horizontal" />

    <Menu buttons={onlineModes} orientation="horizontal" />
    {/* <button
      className="self-start mt-2 px-4 py-2 rounded hover:bg-gray-200"
      onClick={() => navigate(-1)}
    >
      Back
    </button> */}
  </div>
</div>

);
};

export default GameModes;
