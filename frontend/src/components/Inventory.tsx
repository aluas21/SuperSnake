import React from 'react';
import { DollarSign, BadgeCent } from 'lucide-react';
import Carousel from './Carousel';
import Photo from '../assets/inventory_image_mock.png';

const Inventory: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inventory Component</h2>
      <div className="flex items-center gap-2 mb-6">
        <BadgeCent size={48} className="text-yellow-500" />
        <span className="text-xl font-bold"> 45 </span>
        <DollarSign size={48} className="text-green-600 ml-4" />
        <span className="text-xl font-bold"> 123 </span>
      </div>
      <div className="h-[300px] overflow-y-auto overflow-x-hidden border-[0.5em] border-[#ccc] p-8">
        <h2 className="text-xl font-bold mb-4"> Skins </h2>
        <Carousel
          title="Snake"
          images={[
            Photo, Photo, Photo, Photo, Photo, Photo, Photo,
            Photo, Photo, Photo, Photo, Photo, Photo, Photo,
          ]}
        />
        <Carousel
          title="Board"
          images={[
            'board1.png', 'board2.png', 'board3.png', 'board4.png',
            'board5.png', 'board6.png', 'board7.png', 'skin1.png',
            'skin2.png', 'skin3.png', 'skin4.png', 'skin5.png',
            'skin6.png', 'skin7.png',
          ]}
        />
        <Carousel
          title="Apple"
          images={[
            'apple1.png', 'apple2.png', 'apple3.png', 'apple4.png',
            'apple5.png', 'apple6.png', 'apple7.png', 'skin1.png',
            Photo, 'skin3.png', Photo, 'skin5.png',
            'skin6.png', 'skin7.png',
          ]}
        />
        <h2 className="text-xl font-bold mb-4 mt-8"> Power-ups </h2>
        <Carousel images={['powerup1.png', 'powerup2.png', 'powerup3.png']} />
      </div>
    </div>
  );
};

export default Inventory;