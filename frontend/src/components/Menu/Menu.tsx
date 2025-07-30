import React, { useEffect, useState } from 'react';
import MenuButton from '../MenuButton/MenuButton';
import './Menu.css';

interface MenuProps {
  buttons: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    buttonBackground: string;
  }[];
  orientation?: 'horizontal' | 'vertical' | 'grid';
}

const Menu: React.FC<MenuProps> = ({
  buttons = [],
  orientation: propOrientation,
}) => {
  const [orientation, setOrientation] = useState<
    'horizontal' | 'vertical' | 'grid'
  >(propOrientation || 'horizontal');

  useEffect(() => {
    // Only apply responsive behavior if no propOrientation is provided
    if (!propOrientation) {
      const updateOrientation = () => {
        if (window.innerWidth < 600) {
          setOrientation('vertical');
        } else if (window.innerWidth < 900) {
          setOrientation('horizontal');
        } else {
          setOrientation('grid');
        }
      };

      updateOrientation();

      window.addEventListener('resize', updateOrientation);
      return () => {
        window.removeEventListener('resize', updateOrientation);
      };
    }
  }, [propOrientation]);

  // Use propOrientation if provided, else the internal state
  const effectiveOrientation = propOrientation || orientation;

  return (
    <div className={`menu ${effectiveOrientation}`}>
      <div className="button-list">
        {buttons.map((btn, index) => (
          <MenuButton
            key={index}
            title={btn.title}
            description={btn.description}
            buttonText={btn.buttonText}
            buttonLink={btn.buttonLink}
            buttonBackground={btn.buttonBackground}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
