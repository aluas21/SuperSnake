import React from 'react';
import { DollarSign, BadgeCent } from 'lucide-react';
import Carousel from './Carousel';
import Photo from '../assets/inventory_image_mock.png';

const Inventory: React.FC = () => {
  return (
    <div>
      <h2>Inventory Component</h2>
      <div>
        <BadgeCent size={48} />
        <span> 45 </span>
        <DollarSign size={48} />
        <span> 123 </span>
      </div>
      <div className="inventory-items">
        <h2> Skins </h2>
        <Carousel
          title="Snake"
          images={[
            Photo,
            Photo,
            Photo,
            Photo,
            Photo,
            Photo,
            Photo,
            Photo,
            Photo,
            Photo,
            Photo,
            Photo,
            Photo,
            Photo,
          ]}
        />
        <Carousel
          title="Board"
          images={[
            'board1.png',
            'board2.png',
            'board3.png',
            'board4.png',
            'board5.png',
            'board6.png',
            'board7.png',
            'skin1.png',
            'skin2.png',
            'skin3.png',
            'skin4.png',
            'skin5.png',
            'skin6.png',
            'skin7.png',
          ]}
        />
        <Carousel
          title="Apple"
          images={[
            'apple1.png',
            'apple2.png',
            'apple3.png',
            'apple4.png',
            'apple5.png',
            'apple6.png',
            'apple7.png',
            'skin1.png',
            Photo,
            'skin3.png',
            Photo,
            'skin5.png',
            'skin6.png',
            'skin7.png',
          ]}
        />
        <h2> Power-ups </h2>
        <Carousel images={['powerup1.png', 'powerup2.png', 'powerup3.png']} />
      </div>
    </div>
  );
};

export default Inventory;
